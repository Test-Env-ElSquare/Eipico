import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as signalR from '@microsoft/signalr';
import { JobOrderMatairal } from 'src/app/components/Historical/models/model';
import { HistoricalDashboardService } from 'src/app/components/Historical/services/historical-dashboard.service';

interface BatchWorkflowQuery {
  pageSize: number;
  pageNum: number;
  filter: string | null;
  status: string | null;
  includeHidden: boolean;
}

interface BatchWorkflowCard {
  batchId?: string;
  skuName?: string;
  jobOrderId?: string;
  status?: string;
  color?: string;
  totalMaterials?: number;
  weightedMaterials?: number;
  handheldWeightedMaterials?: number;
  splittedWeightedMaterials?: number;
  loadedMaterials?: number;
  productionStartedMaterials?: number;
  lastWeightTime?: string;
  lastMachineLoadTime?: string;
}

interface BatchWorkflowResponse {
  items?: BatchWorkflowCard[];
}

@Component({
  selector: 'app-batch-workflow',
  templateUrl: './batch-workflow.component.html',
  styleUrls: ['./batch-workflow.component.scss'],
})
export class BatchWorkflowComponent implements OnInit, OnDestroy {
  readonly hubUrl = 'http://10.1.1.240/Eipico/batchWorkflowHub';
  token = localStorage.getItem('Token') || '';
  filter = '';
  status = '';
  includeHidden = false;
  connectionStatus = 'Disconnected';
  rawMessage = '';
  cards: BatchWorkflowCard[] = [];
  errorMessage = '';
  selectedCard: BatchWorkflowCard | null = null;
  selectedMaterials: JobOrderMatairal[] = [];

  private allCards: BatchWorkflowCard[] = [];
  private connection: signalR.HubConnection | null = null;

  constructor(
    private modalService: NgbModal,
    private historicalDashboardService: HistoricalDashboardService,
  ) {}

  ngOnInit(): void {
    this.setStatus('Disconnected');
    this.connect();
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  get isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  async connect(): Promise<void> {
    try {
      this.errorMessage = '';

      if (this.isConnected) {
        this.setStatus('Already connected');
        return;
      }

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          accessTokenFactory: () => this.token.trim(),
        })
        .withAutomaticReconnect()
        .build();

      this.connection.on(
        'ReceiveBatchWorkflowCards',
        (data: BatchWorkflowResponse) => {
          this.rawMessage = JSON.stringify(data, null, 2);
          this.allCards = (data.items || []).filter(
            (card) => !this.hasDataMismatch(card),
          );
          this.applyFilters();
        },
      );

      this.connection.onreconnecting(() => this.setStatus('Reconnecting...'));

      this.connection.onreconnected(async () => {
        this.setStatus('Connected');
        await this.subscribe();
        await this.requestCards();
      });

      this.connection.onclose(() => this.setStatus('Disconnected'));

      this.setStatus('Connecting...');
      await this.connection.start();
      this.setStatus('Connected');
      await this.subscribe();
      await this.requestCards();
    } catch (err) {
      this.setStatus('Connection failed');
      this.errorMessage = 'Connection failed. Check the browser console.';
      console.error('SignalR connection error:', err);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.connection) {
        await this.connection.stop();
        this.connection = null;
      }

      this.setStatus('Disconnected');
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  }

  async requestCards(): Promise<void> {
    try {
      this.errorMessage = '';

      if (!this.isConnected || !this.connection) {
        this.errorMessage = 'Connect first.';
        return;
      }

      const query: BatchWorkflowQuery = {
        pageSize: 200,
        pageNum: 1,
        filter: this.filter || null,
        status: this.status || null,
        includeHidden: this.includeHidden,
      };

      await this.connection.invoke('RequestCards', query);
    } catch (err) {
      this.errorMessage = 'RequestCards failed. Check the browser console.';
      console.error('RequestCards error:', err);
    }
  }

  onFiltersChange(): void {
    this.applyFilters();

    if (this.isConnected) {
      this.requestCards();
    }
  }

  openCardDetails(
    content: TemplateRef<any>,
    card: BatchWorkflowCard,
  ): void {
    this.selectedCard = card;
    this.selectedMaterials = [];

    if (!card.jobOrderId) {
      this.modalService.open(content, { size: 'lg', centered: true });
      return;
    }

    this.historicalDashboardService
      .JobOrderMatairal(card.jobOrderId)
      .subscribe({
        next: (data) => {
          this.selectedMaterials = data;
          this.modalService.open(content, { size: 'xl', centered: true });
        },
        error: (err) => {
          console.error('JobOrderMatairal error:', err);
          this.modalService.open(content, { size: 'lg', centered: true });
        },
      });
  }

  formatDate(value?: string): string {
    if (!value) {
      return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  }

  getCardClass(card: BatchWorkflowCard): string {
    const color = this.normalizeKey(card.color);

    if (['red', 'yellow', 'green'].includes(color)) {
      return color;
    }

    switch (this.normalizeKey(card.status)) {
      case 'sapreceived':
        return 'red';
      case 'inprogress':
        return 'yellow';
      case 'machineloaded':
        return 'green';
      default:
        return 'gray';
    }
  }

  showValue(value: string | number | undefined | null): string {
    if (value === undefined || value === null || value === '') {
      return '-';
    }

    return String(value);
  }

  private async subscribe(): Promise<void> {
    if (this.connection) {
      await this.connection.invoke('Subscribe');
    }
  }

  private setStatus(text: string): void {
    this.connectionStatus = text;
  }

  private applyFilters(): void {
    const search = this.normalize(this.filter);
    const selectedStatus = this.normalizeKey(this.status);

    this.cards = this.allCards.filter((card) => {
      const cardStatus = this.normalizeKey(card.status);
      const cardColor = this.normalizeKey(card.color);
      const isHidden = cardStatus === 'hidden' || cardColor === 'hidden';

      if (!this.includeHidden && selectedStatus !== 'hidden' && isHidden) {
        return false;
      }

      if (
        selectedStatus &&
        selectedStatus !== cardStatus &&
        selectedStatus !== cardColor
      ) {
        return false;
      }

      if (!search) {
        return true;
      }

      return [
        card.batchId,
        card.skuName,
        card.jobOrderId,
        card.status,
        card.color,
        card.lastWeightTime,
        card.lastMachineLoadTime,
      ].some((value) => this.normalize(value).includes(search));
    });
  }

  private hasDataMismatch(card: BatchWorkflowCard): boolean {
    return Object.values(card).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes('datamismatch'),
    );
  }

  private normalize(value: string | number | undefined | null): string {
    return String(value || '').trim().toLowerCase();
  }

  private normalizeKey(value: string | number | undefined | null): string {
    return this.normalize(value).replace(/[^a-z0-9]/g, '');
  }
}

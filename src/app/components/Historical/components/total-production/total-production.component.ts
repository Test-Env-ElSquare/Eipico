import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  EnergyRefactor,
  fillers,
  JobOrderMatairal,
  skus,
} from '../../models/model';
import { HistoricalDashboardService } from '../../services/historical-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app-Service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-total-production',
  templateUrl: './total-production.component.html',
  styleUrls: ['./total-production.component.scss'],
})
export class TotalProductionComponent implements OnInit, OnChanges, OnDestroy {
  skusActivated?: skus[];
  part?: number | boolean;
  duration: number;
  JobOrderMatairal: JobOrderMatairal[];
  basicModalCloseResult: string = '';
  liveConnected: boolean = false;
  lineId: number;

  @Input() filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  };
  energy: EnergyRefactor;
  filler: fillers;

  // Add subscription to track SignalR updates
  private fillerSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private _historicalDashboardService: HistoricalDashboardService,
    private _cdr: ChangeDetectorRef,
    private _toastr: ToastrService,
    private _appServices: AppService
  ) {}

  openBasicModal(
    content: TemplateRef<any>,
    jobOrderId: string,
    machaineId: number
  ) {
    this._historicalDashboardService
      .JobOrderMatairal(jobOrderId)
      .subscribe((data) => {
        this.JobOrderMatairal = data;
        this.modalService
          .open(content, { size: 'lg', centered: false })
          .result.then((result) => {
            this.basicModalCloseResult = 'Modal closed' + result;
          })
          .catch((res) => {});
      });
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  EnergyRefactor() {
    this._historicalDashboardService
      .EnergyRefactor(
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj.to
      )
      .subscribe((data) => {
        this.energy = data;
      });
  }

  getFillerRefactor() {
    this._historicalDashboardService
      .getFillerRefactor(
        this.filterObj.selectedFactory,
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj.to
      )
      .subscribe((data) => {
        this.filler = data[0]?.filerreads;
        this.part = this.filler?.count;
      });
  }

  getSkus() {
    this._historicalDashboardService
      .GetSkus(
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj.to
      )
      .subscribe((data) => {
        this.skusActivated = data;
      });
  }

  stopCon() {
    if (this.liveConnected) {
      this._historicalDashboardService.hubConnection.stop();
      this.part = false;
      this.liveConnected = false;

      // Unsubscribe from SignalR updates
      if (this.fillerSubscription) {
        this.fillerSubscription.unsubscribe();
      }
    }
  }

  StartCon() {
    this._historicalDashboardService.startConnectionSignalR(this.filterObj);
    this._toastr.success('Connected');
    this.liveConnected = true;

    // Subscribe to SignalR updates
    this.subscribeToSignalR();
  }

  // Subscribe to the SignalR data stream
  subscribeToSignalR() {
    if (this.fillerSubscription) {
      this.fillerSubscription.unsubscribe();
    }

    this.fillerSubscription =
      this._historicalDashboardService.fillerData$.subscribe((data) => {
        if (data) {
          this.filler = data;
          this.part = data.count;
          this._cdr.detectChanges();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only reload data if filterObj actually changed
    if (changes['filterObj'] && !changes['filterObj'].firstChange) {
      this.loadData();
      this.handleConnection();
    }
  }

  ngOnInit(): void {
    this.loadData();
    this.handleConnection();
  }

  // Helper method to load all data
  loadData(): void {
    this.EnergyRefactor();
    this.getFillerRefactor();
    this.getSkus();
  }

  // Helper method to handle SignalR connection logic
  handleConnection(): void {
    if (this.filterObj.shiftFilterid === 0) {
      if (this.liveConnected) {
        this.stopCon();
      }
      this.StartCon();
    } else {
      this.stopCon();
    }
  }

  ngOnDestroy(): void {
    this.stopCon();
  }
}

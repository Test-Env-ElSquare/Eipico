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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  EnergyRefactor,
  fillers,
  JobOrderMatairal,
  skus,
} from '../../models/model';
import { HistoricalDashboardService } from '../../services/historical-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app-Service.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-total-production',
  templateUrl: './total-production.component.html',
  styleUrls: ['./total-production.component.scss'],
})
export class TotalProductionComponent implements OnChanges, OnDestroy {
  skusActivated: any[] = [];
  isLoading: boolean = true;
  part?: number | boolean | null;
  duration: number;
  JobOrderMatairal: JobOrderMatairal[];
  basicModalCloseResult: string = '';
  liveConnected: boolean = false;
  lineId: number;
  noSkuData: boolean = false;

  private isLoadingFiller = true;

  private destroy$ = new Subject<void>();
  private filterChange$ = new Subject<void>();

  @Input() filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  };

  energy: EnergyRefactor;
  filler: fillers | null = null;
  filerreads: any;

  private fillerSubscription: Subscription | null = null;

  constructor(
    private modalService: NgbModal,
    private _historicalDashboardService: HistoricalDashboardService,
    private _cdr: ChangeDetectorRef,
    private _toastr: ToastrService,
    private _appServices: AppService,
  ) {}

  openBasicModal(
    content: TemplateRef<any>,
    jobOrderId: string,
    machaineId: number,
  ) {
    this._historicalDashboardService
      .JobOrderMatairal(jobOrderId)
      .pipe(takeUntil(this.destroy$))
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
        this.filterObj.to,
      )
      .pipe(takeUntil(this.filterChange$))
      .subscribe((data) => {
        this.energy = data;
      });
  }

  getFillerRefactor() {
    this.isLoadingFiller = true;

    this._historicalDashboardService
      .getFillerRefactor(
        this.filterObj.selectedFactory,
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj.to,
      )
      .pipe(takeUntil(this.filterChange$))
      .subscribe((data) => {
        this.filler = data[0]?.filerreads;
        this.part = this.filler?.count;

        this.isLoadingFiller = false;
      });
  }

  getSkus() {
    this.isLoading = true;

    this._historicalDashboardService
      .GetSkus(
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj.to,
      )
      .pipe(takeUntil(this.filterChange$))
      .subscribe({
        next: (data) => {
          this.skusActivated = data ?? [];
          this.isLoading = false;
        },
        error: () => {
          this.skusActivated = [];
          this.isLoading = false;
        },
      });
  }

  async stopCon() {
    if (this.liveConnected) {
      try {
        await this._historicalDashboardService.hubConnection.stop();
      } catch (err) {
        console.error('Error stopping SignalR connection:', err);
      }

      this.part = false;
      this.liveConnected = false;

      if (this.fillerSubscription) {
        this.fillerSubscription.unsubscribe();
        this.fillerSubscription = null;
      }
    }
  }

  StartCon() {
    this.subscribeToSignalR();
    this._historicalDashboardService.startConnectionSignalR(this.filterObj);
    this.liveConnected = true;
    this._toastr.success('Connected');
  }

  subscribeToSignalR() {
    if (this.fillerSubscription) {
      this.fillerSubscription.unsubscribe();
      this.fillerSubscription = null;
    }

    this.fillerSubscription =
      this._historicalDashboardService.fillerData$.subscribe((data) => {
        console.log('TotalProductionComponent Received Filler Data:', data);
        if (data && !this.isLoadingFiller) {
          this.filler = {
            ...(this.filler ?? {}),
            ...data,
            avgSpeed:
              data.avgSpeed !== 0 ? data.avgSpeed : this.filler?.avgSpeed,
            weightedavgspeed:
              data.weightedavgspeed !== 0
                ? data.weightedavgspeed
                : this.filler?.weightedavgspeed,
            equevilantAVGSpeed:
              data.equevilantAVGSpeed !== 0
                ? data.equevilantAVGSpeed
                : this.filler?.equevilantAVGSpeed,
          } as fillers;
          this.part = data.count;
          console.log('Updated Filler Object:', this.filler);
          this._cdr.detectChanges();
        }
      });
  }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['filterObj'] && this.filterObj) {
      this.filterChange$.next();
      await this.handleConnection();
      this.loadData();
    }
  }

  loadData(): void {
    this.EnergyRefactor();
    this.getFillerRefactor();
    this.getSkus();
  }

  async handleConnection(): Promise<void> {
    this.filler = null;
    this.part = null;

    if (this.filterObj.shiftFilterid === 0) {
      if (this.liveConnected) {
        await this.stopCon();
      }
      this.StartCon();
    } else {
      await this.stopCon();
    }
  }

  ngOnDestroy(): void {
    // إلغاء كل الـ subscriptions
    this.destroy$.next();
    this.destroy$.complete();
    this.filterChange$.next();
    this.filterChange$.complete();
    this.stopCon();
  }
}

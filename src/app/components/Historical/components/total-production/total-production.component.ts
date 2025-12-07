import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
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

@Component({
  selector: 'app-total-production',
  templateUrl: './total-production.component.html',
  styleUrls: ['./total-production.component.scss'],
})
export class TotalProductionComponent
  implements OnInit, OnChanges, AfterViewInit
{
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

  constructor(
    private modalService: NgbModal,
    private _historicalDashboardService: HistoricalDashboardService,
    private _cdr: ChangeDetectorRef,
    private _toastr: ToastrService,
    private _appServices: AppService
  ) {}

  //open modal
  //get skus details by jobid
  openBasicModal(
    content: TemplateRef<any>,
    jobOrderId: string,
    machaineId: number
  ) {
    // const options: NgbModalOptions ={ centered: true}
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
        this.part = this.filler.count;
      });
  }

  //to get activated skus
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
    }
  }

  StartCon() {
    this._historicalDashboardService.startConnectionSignalR(this.filterObj);
    // this._historicalDashboardService.startConnection();
    this._toastr.success('Connected');
    this.liveConnected = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._cdr.detectChanges();
    this.EnergyRefactor();
    this.getFillerRefactor();
    this.getSkus();
    if (this.filterObj.shiftFilterid == 0) {
      this.StartCon();
    } else if (this.filterObj.shiftFilterid == 0 && this.liveConnected) {
      this.stopCon();
      this.StartCon();
    } else {
      this.stopCon();
    }
  }
  ngOnInit(): void {
    this.EnergyRefactor();
    this.getFillerRefactor();
    this.getSkus();
  }
  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }
}

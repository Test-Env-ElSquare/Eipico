import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Line, factory } from 'src/app/core/models/filter';
import { AppService } from 'src/app/core/services/app-Service.service';
import {
  JobOrderDetails,
  JobOrderMatairal,
  skus,
} from '../Historical/models/model';
import { BatchSchedulerService } from './services/batch-scheduler.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoricalDashboardService } from '../Historical/services/historical-dashboard.service';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-batch-scheduler',
  templateUrl: './batch-scheduler.component.html',
  styleUrls: ['./batch-scheduler.component.scss'],
})
export class BatchSchedulerComponent implements OnInit {
  FilterForm: FormGroup;
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  selectedFactory: number;
  selectedLine: number;
  isPending: number = 1;
  skusArr: skus[];
  JobOrderDetails: JobOrderDetails;
  basicModalCloseResult: string = '';
  searchText!: string;
  accessToFactories: boolean = true;

  constructor(
    private _appServices: AppService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _batchScheduler: BatchSchedulerService,
    private _toastrService: ToastrService,
    private modalService: NgbModal,
    private _historicalDashboardService: HistoricalDashboardService
  ) {}

  ngOnInit(): void {
    this.GetAllFactories();
    this.createForm();
  }

  hasAccessToActivateBatch() {
    return this._authService.isHasAccessToBatchSchedulerViewAndActivate();
  }

  hasAccessToFinisheBatch() {
    return this._authService.isHasAccessToBatchSchedulerViewAndFinish();
  }

  GetAllFactories() {
    if (
      this._authService.isHasAccessToE2() &&
      this._authService.isHasAccessToE1()
    ) {
      this._appServices.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
      });
    } else if (this._authService.isHasAccessToE2()) {
      this.selectedFactory = 3;
      this.GetFactoryLines(3);
      this.accessToFactories = false;
    } else if (this._authService.isHasAccessToE1()) {
      this.selectedFactory = 2;
      this.GetFactoryLines(2);
      this.accessToFactories = false;
    }
  }

  GetFactoryLines(factoryId: number) {
    this._appServices.GetFactoryLines(+factoryId).subscribe((data) => {
      this.LineDropDown = data;
    });
  }

  createForm() {
    this.FilterForm = this._fb.group({
      factoryId: [],
      lineID: [, [Validators.required]],
    });
  }

  getSkus(lineId: number, isPending: number) {
    this.searchText = '';
    this._appServices.GetSkusNew(lineId, isPending).subscribe((data) => {
      this.skusArr = data;
    });
  }

  getBatches(text: string) {
    this._batchScheduler
      .getBatchesBySearch(text, this.selectedLine, this.isPending)
      .subscribe((data) => {
        this.skusArr = data;
      });
  }

  activate(batchNumber: string) {
    this._batchScheduler
      .patchActivate(batchNumber, this.selectedLine)
      .subscribe((data: any) => {
        this._toastrService.success(data.message);
        this.search();
      });
  }

  Finished(batchNumber: string) {
    this._batchScheduler.patchFinish(batchNumber).subscribe((data) => {
      this._toastrService.success('updated');
      this.isPending = 0;
      this.search();
    });
  }

  search() {
    this.getSkus(this.FilterForm.value.lineID, this.isPending);
  }

  openBasicModal(content: TemplateRef<any>, jobOrderId: string) {
    this._historicalDashboardService
      .JobOrderDetails(jobOrderId)
      .subscribe((data) => {
        this.JobOrderDetails = data;
        this.modalService
          .open(content, { size: 'xl', centered: true })
          .result.then((result) => {
            this.basicModalCloseResult = 'Modal closed' + result;
          })
          .catch((res) => {});
      });
  }

  checked(isPending: number) {
    this.getSkus(this.selectedLine, isPending);
  }
}

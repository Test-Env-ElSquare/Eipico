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
import { PermissionService } from 'src/app/core/services/permission.service';
import { Permission } from 'src/app/core/models/permission';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-batch-scheduler',
  templateUrl: './batch-scheduler.component.html',
  styleUrls: ['./batch-scheduler.component.scss'],
})
export class BatchSchedulerComponent implements OnInit {
  FilterForm: FormGroup;
  batchForm: FormGroup;
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
  visible: boolean = false;

  showDialog(batchId: string) {
    this.visible = true;
    this.batchForm.patchValue({
      BatchId: batchId,
    });
  }
  constructor(
    private _appServices: AppService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _batchScheduler: BatchSchedulerService,
    private _toastrService: ToastrService,
    private modalService: NgbModal,
    private _historicalDashboardService: HistoricalDashboardService,
    private Permission: PermissionService
  ) {}

  ngOnInit(): void {
    this.onGetAllFactories();
    this.createForm();
    this.initForm();
  }
  initForm() {
    this.batchForm = this._fb.group({
      BatchId: [{ value: '', disabled: true }, Validators.required],
      lineId: [null, Validators.required],
    });
  }
  hasAccessToActivateBatch() {
    return this.Permission.has(Permission.BatchSchedulerViewAndActivate);
  }

  hasAccessToFinisheBatch() {
    return this.Permission.has(Permission.BatchSchedulerViewAndFinish);
  }
  onGetAllFactories() {
    this._appServices.GetAllFactories().subscribe({
      next: (res) => {
        this.FactoriesDropDown = res;
      },
    });
  }
  // GetAllFactories() {
  //   if (
  //     // this._authService.isHasAccessToE2() &&
  //     // this._authService.isHasAccessToE1()
  //     this.Permission.hasAll([Permission.E1, Permission.E2])
  //   ) {
  //     this._appServices.GetAllFactories().subscribe((data) => {
  //       this.FactoriesDropDown = data;
  //     });
  //   } else if (this._authService.isHasAccessToE2()) {
  //     this.selectedFactory = 3;
  //     this.GetFactoryLines(3);
  //     this.accessToFactories = false;
  //   } else if (this._authService.isHasAccessToE1()) {
  //     this.selectedFactory = 2;
  //     this.GetFactoryLines(2);
  //     this.accessToFactories = false;
  //   }
  // }

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
  updateBatchForm() {
    const { BatchId, lineId } = this.batchForm.getRawValue();
    this.onUpdateBatch(BatchId, lineId);
  }
  onUpdateBatch(batchId: string, lineId: string) {
    this._batchScheduler.updateBatch(batchId, lineId).subscribe({
      next: (res) => {
        console.log('batch:', batchId, lineId);
        this.visible = false;
        this._toastrService.success('Batch updated successfully');
        this.getBatches(this.searchText);
      },
      error: (err) => {
        this._toastrService.error('Error updating batch');
      },
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

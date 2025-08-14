import { Component, OnInit } from '@angular/core';
import {
  BatchMatarials,
  pariedBatchesData,
  machineLoadDetails,
  scaleDetails,
} from '../../models/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-batch-history',
  templateUrl: './batch-history.component.html',
  styleUrls: ['./batch-history.component.scss'],
})
export class BatchHistoryComponent implements OnInit {
  batchArr: pariedBatchesData[];
  machineLoadDetails: machineLoadDetails;
  batchMatarialsArr: BatchMatarials[];
  batchName: string | undefined;
  scaleDetails: scaleDetails;
  materialName: string;
  page: number = 1;
  pagesize: number = 10;
  totalCount: number | undefined;

  constructor(
    private _batchService: BatchService,
    private _modalService: NgbModal
  ) {}

  getAll(page: number) {
    this._batchService.pairedBatches(page, this.pagesize).subscribe((data) => {
      this.batchArr = data[0].batches;
      this.totalCount = data[0].count;
    });
  }

  openLg(content: any, batchname: string | undefined) {
    this._batchService
      .getBatchMatarials(String(batchname))
      .subscribe((data) => {
        this.batchMatarialsArr = data;
        this.batchName = batchname;
        this._modalService.open(content, { size: 'xl', centered: true });
      });
  }

  GetMachineLoadDetails(
    content: any,
    machineUid: string,
    materialName: string
  ) {
    this.materialName = materialName;
    this._batchService.GetMachineLoadDetails(machineUid).subscribe((data) => {
      this.machineLoadDetails = data[0];
      this._modalService.open(content, { size: 'lg', centered: true });
    });
  }

  pageChange(event: number) {
    this.page = event;
    this.getAll(this.page);
  }

  GetScaleDetails(
    content: any,
    machineUid: string,
    materialName: string,
    isSplited: number
  ) {
    this.materialName = materialName;
    this._batchService
      .GetScaleDetails(machineUid, isSplited)
      .subscribe((data) => {
        this.scaleDetails = data;
        this._modalService.open(content, { size: 'lg', centered: true });
      });
  }

  ngOnInit(): void {
    this.getAll(this.page);
  }
}

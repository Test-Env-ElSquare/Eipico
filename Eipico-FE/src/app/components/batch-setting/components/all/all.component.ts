import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BatchService } from '../../services/batch.service';
import {
  Batch,
  BatchMatarials,
  machineLoadDetails,
  scaleDetails,
} from '../../models/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  SortDirection,
  SortEvent,
  SortableHeaderDirective,
} from 'src/app/core/directives/sortable-header.directive';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  searchText: string = '';
  batchArr: Batch[];
  batchArrForSort: Batch[];
  batchMatarialsArr: BatchMatarials[];
  page: number = 1;
  batchName: string;
  pagesize: number = 10;
  totalCount: number;
  machineLoadDetails: machineLoadDetails;
  scaleDetails: scaleDetails;
  materialName: string;
  directions: SortDirection = 'desc';
  splited: number;
  rotate: { [key: string]: SortDirection } = {
    asc: 'desc',
    desc: '',
    '': 'asc',
  };
  @ViewChildren(SortableHeaderDirective)
  headers: QueryList<SortableHeaderDirective>;
  compare = (v1: string | number, v2: string | number) =>
    v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  searchWord: string;

  constructor(
    private _batchService: BatchService,
    private _authService: AuthService,
    private _modalService: NgbModal,
    private _toastr: ToastrService
  ) {}

  hasAccessToPrintBatch() {
    return this._authService.isHasAccessToBatchSettingsAndPrint();
  }

  hasAccessToDeleteBatch() {
    return this._authService.isHasAccessToBatchSettingsAndDelete();
  }

  getAll(page: number = 1, searchtext: string | null = null) {
    this._batchService
      .getAll(page, this.pagesize, searchtext)
      .subscribe((data) => {
        this.batchArrForSort = data[0];
        this.batchArr = data[0];
        this.totalCount = data[1];
      });
  }

  pageChange(event: number) {
    this.page = event;
    this.getAll(this.page, this.searchWord);
  }

  openLg(content: any, batchname: string) {
    this._batchService.getBatchMatarials(batchname).subscribe((data) => {
      this.batchMatarialsArr = data;
      this.batchName = batchname;
      this._modalService.open(content, { size: 'xl', centered: true });
    });
  }

  printBatch(batchName: string) {
    this._batchService.RePrintBatch(batchName).subscribe((data) => {
      this._toastr.success('printed');
    });
  }

  printMaterial(uid: string) {
    this._batchService.RePrintMatarial(uid).subscribe((data) => {
      this._toastr.success('printed');
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

  GetScaleDetails(
    content: any,
    machineUid: string,
    materialName: string,
    isSplited: number
  ) {
    this.materialName = materialName;
    this.splited = isSplited;
    this._batchService
      .GetScaleDetails(machineUid, isSplited)
      .subscribe((data) => {
        this.scaleDetails = data;
        this._modalService.open(content, { size: 'lg', centered: true });
      });
  }

  search(searchText: string) {
    this.page = 1;
    this.searchWord = searchText;
    this.getAll(this.page, searchText);
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    // sorting dataTable
    if (direction === '' || column === '') {
      this.batchArr = this.batchArrForSort;
      console.log('test');
    } else {
      this.batchArr = [...this.batchArrForSort].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        console.log('test');

        return direction === 'asc' ? res : -res;
      });
    }
  }

  rotates() {
    this.directions = this.rotate[this.directions];
    console.log(this.directions);
  }
  ngOnInit(): void {
    this.getAll();
  }
}

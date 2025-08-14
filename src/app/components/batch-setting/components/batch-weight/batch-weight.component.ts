import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
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
import { JobOrderMatairal } from 'src/app/components/Historical/models/model';
import { HistoricalDashboardService } from 'src/app/components/Historical/services/historical-dashboard.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-batch-weight',
  templateUrl: './batch-weight.component.html',
  styleUrls: ['./batch-weight.component.scss'],
})
export class BatchWeightComponent implements OnInit {
  searchText: string = '';
  batchArr: Batch[];
  batchArrForSort: Batch[];
  batchMatarialsArr: BatchMatarials[];
  page: number = 1;
  batchName: string;
  pagesize: number = 10;
  totalCount: number;
  machineLoadDetails: machineLoadDetails;
  JobOrderMatairal: JobOrderMatairal[];
  basicModalCloseResult: string = '';
  batchId: string;
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
    private _modalService: NgbModal,
    private _historicalDashboardService: HistoricalDashboardService,

    private _toastr: ToastrService
  ) {}

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

  openBasicModal(
    content: TemplateRef<any>,
    jobOrderId: string
    // machaineId: number
  ) {
    // const options: NgbModalOptions ={ centered: true}
    this._historicalDashboardService
      .JobOrderMatairal(jobOrderId)
      .subscribe((data) => {
        this.batchId = jobOrderId;
        this.JobOrderMatairal = data;
        this._modalService
          .open(content, { size: 'lg', centered: false })
          .result.then((result) => {
            this.basicModalCloseResult = 'Modal closed' + result;
          })
          .catch((res) => {});
      });
  }

  exportToExcel(): void {
    const dataToExport = this.JobOrderMatairal.map((item) => ({
      'Material Name': item.materialName,
      'Material Code': item.uid,
      // 'SAP Weight': item.sapweight,
      'Actual Weight':
        item.handheldweight !== '-1' ? item.handheldweight : 'N/A',
      // 'Deviation %': item.deviation !== -1 ? item.deviation : 'N/A',
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, {
      skipHeader: false,
    });

    const workbook: XLSX.WorkBook = {
      Sheets: { JobOrderMatairal: worksheet },
      SheetNames: ['JobOrderMatairal'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'JobOrderMatairal');
  }

  exportPdf() {
    const datePipe = new DatePipe('en-US');
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((autoTable) => {
        const doc = new jsPDF.default();
        // Add header text
        doc.setFontSize(16); // Set font size
        doc.setTextColor(40); // Set text color
        doc.setFontSize(12);
        doc.text(`Batch Number : ${this.batchId}`, 105, 10, {
          align: 'center',
        });

        // Table data
        const tableData = this.JobOrderMatairal.map((item) => [
          item.materialName || 'N/A',
          item.uid || 'N/A',
          // item.sapWeight || 'N/A',
          item.handheldweight || 'N/A',
          datePipe.transform(item.timeStamp, 'dd-MM-yyyy HH:mm a') || 'N/A',
        ]);

        autoTable.default(doc, {
          head: [
            ['Material Name', 'Material Code', 'Actual Weight', 'Time Stamp'],
          ],
          body: tableData,
        });

        doc.save('materials-report.pdf');
      });
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}_${this.batchId}.xlsx`);
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

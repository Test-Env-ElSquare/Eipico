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

    private _toastr: ToastrService,
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
    jobOrderId: string,
    // machaineId: number
  ) {
    // const options: NgbModalOptions ={ centered: true}
    this._historicalDashboardService
      .JobOrderMatairal(jobOrderId)
      .subscribe((data) => {
        this.batchId = jobOrderId;
        this.JobOrderMatairal = data;
        this._modalService
          .open(content, { size: 'xl', centered: false })
          .result.then((result) => {
            this.basicModalCloseResult = 'Modal closed' + result;
          })
          .catch((res) => {});
      });
  }
  printBatchRow(jobOrderId: string): void {
    this._historicalDashboardService
      .JobOrderMatairal(jobOrderId)
      .subscribe((data) => {
        const content = `
        <h1>Batch Weight Report</h1>
        <h2>Batch Number: ${this.escapeHtml(jobOrderId || 'N/A')}</h2>
        ${this.renderMaterialTable(data || [])}
      `;

        this.printDocument(`Batch Weight - ${jobOrderId || ''}`, content);
      });
  }

  private renderMaterialTable(materials: JobOrderMatairal[]): string {
    const datePipe = new DatePipe('en-US');
    const rows = materials
      .map(
        (item) => `
          <tr>
            <td>${this.escapeHtml(item.materialName || 'N/A')}</td>
            <td>${this.escapeHtml(item.uid || 'N/A')}</td>
            <td>${this.escapeHtml(this.getSapWeight(item))}</td>
            <td>${this.escapeHtml(this.getSapWeight(item))}</td>
            <td>${this.escapeHtml(
              item.deviation !== -1 ? item.deviation : 'N/A',
            )}</td>
            <td>${this.escapeHtml(
              datePipe.transform(item.timeStamp, 'dd-MM-yyyy HH:mm a') || 'N/A',
            )}</td>
            <td>${this.escapeHtml(item.processType || 'N/A')}</td>
            <td>${this.escapeHtml(item.roomName || 'N/A')}</td>
          </tr>
        `,
      )
      .join('');

    return `
      <table>
        <thead>
          <tr>
            <th>Material Name</th>
            <th>Material Code</th>
            <th>SAP Weight</th>
            <th>Actual Weight</th>
            <th>Deviation %</th>
            <th>Time Stamp</th>
            <th>Process Type</th>
            <th>Room Name</th>
          </tr>
        </thead>
        <tbody>
          ${rows || '<tr><td colspan="8" class="empty-row">No materials found</td></tr>'}
        </tbody>
      </table>
    `;
  }

  private printDocument(title: string, content: string) {
    const printWindow = window.open('', '_blank', 'width=900,height=700');

    if (!printWindow) {
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${this.escapeHtml(title)}</title>
          <style>
            body {
              color: #111827;
              font-family: Arial, sans-serif;
              margin: 24px;
            }
            h1 {
              font-size: 22px;
              margin: 0 0 18px;
            }
            h2 {
              font-size: 18px;
              margin: 24px 0 12px;
            }
            table {
              border-collapse: collapse;
              margin-bottom: 18px;
              width: 100%;
            }
            th,
            td {
              border: 1px solid #d1d5db;
              padding: 10px;
              text-align: left;
              vertical-align: top;
            }
            th {
              background: #f3f4f6;
              font-weight: 700;
            }
            .empty-row {
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  private escapeHtml(value: string | number | undefined | null): string {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  exportToExcel(): void {
    const datePipe = new DatePipe('en-US');
    const dataToExport = (this.JobOrderMatairal || []).map((item) => ({
      'Material Name': item.materialName || 'N/A',
      'Material Code': item.uid || 'N/A',
      'SAP Weight': this.getSapWeight(item),
      'Actual Weight': this.getSapWeight(item),
      'Deviation %': item.deviation !== -1 ? item.deviation : 'N/A',
      'Time Stamp':
        datePipe.transform(item.timeStamp, 'dd-MM-yyyy HH:mm a') || 'N/A',
      'Process Type': item.processType || 'N/A',
      'Room Name': item.roomName || 'N/A',
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, {
      skipHeader: false,
    });
    worksheet['!cols'] = [
      { wch: 28 },
      { wch: 20 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 22 },
      { wch: 16 },
      { wch: 20 },
    ];

    const workbook: XLSX.WorkBook = {
      Sheets: { Materials: worksheet },
      SheetNames: ['Materials'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'JobOrderMaterials');
  }

  exportPdf(): void {
    const datePipe = new DatePipe('en-US');
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((autoTable) => {
        const doc = new jsPDF.default({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
        });

        doc.setFontSize(15);
        doc.setTextColor(32, 48, 66);
        doc.text(`Batch Weight Report`, 148.5, 12, { align: 'center' });
        doc.setFontSize(10);
        doc.setTextColor(80, 96, 112);
        doc.text(`Batch Number: ${this.batchId || 'N/A'}`, 148.5, 19, {
          align: 'center',
        });

        const tableData = (this.JobOrderMatairal || []).map((item) => [
          item.materialName || 'N/A',
          item.uid || 'N/A',
          this.getSapWeight(item),
          this.getSapWeight(item),
          item.deviation !== -1 ? item.deviation : 'N/A',
          datePipe.transform(item.timeStamp, 'dd-MM-yyyy HH:mm a') || 'N/A',
          item.processType || 'N/A',
          item.roomName || 'N/A',
        ]);

        autoTable.default(doc, {
          startY: 25,
          head: [
            [
              'Material Name',
              'Material Code',
              'SAP Weight',
              'Actual Weight',
              'Deviation %',
              'Time Stamp',
              'Process Type',
              'Room Name',
            ],
          ],
          body: tableData,
          theme: 'grid',
          styles: {
            fontSize: 8,
            cellPadding: 2.2,
            overflow: 'linebreak',
            valign: 'middle',
          },
          headStyles: {
            fillColor: [33, 134, 196],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
          },
          alternateRowStyles: { fillColor: [246, 249, 252] },
          columnStyles: {
            0: { cellWidth: 48 },
            1: { cellWidth: 32 },
            2: { cellWidth: 24 },
            3: { cellWidth: 25 },
            4: { cellWidth: 22 },
            5: { cellWidth: 38 },
            6: { cellWidth: 27 },
            7: { cellWidth: 32 },
          },
          margin: { left: 8, right: 8 },
          didDrawPage: (data: any) => {
            const pageCount = doc.getNumberOfPages();
            doc.setFontSize(8);
            doc.setTextColor(120);
            doc.text(
              `Page ${pageCount}`,
              doc.internal.pageSize.getWidth() - 10,
              doc.internal.pageSize.getHeight() - 6,
              { align: 'right' },
            );
          },
        });

        doc.save(`Batch_Weight_${this.batchId || 'report'}.pdf`);
      });
    });
  }

  private getSapWeight(item: JobOrderMatairal): string {
    return item.sapweight && item.sapweight !== '-1' ? item.sapweight : 'N/A';
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}_${this.batchId}.xlsx`);
  }

  GetMachineLoadDetails(
    content: any,
    machineUid: string,
    materialName: string,
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
    isSplited: number,
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

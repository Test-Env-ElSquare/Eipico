import { Component, OnInit } from '@angular/core';
import {
  BatchMatarials,
  pariedBatchesData,
  machineLoadDetails,
  scaleDetails,
  Batch,
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
  searchText: string = '';
  searchWord: string;
  machineLoadDetails: machineLoadDetails;
  batchMatarialsArr: BatchMatarials[];
  batchName: string | undefined;
  scaleDetails: scaleDetails;
  materialName: string;
  page: number = 1;
  pagesize: number = 10;
  totalCount: number | undefined;
  batchArrForSort: Batch[];
  selectedBatch: pariedBatchesData | undefined;

  constructor(
    private _batchService: BatchService,
    private _modalService: NgbModal
  ) {}

  getAll(page: number = 1, searchtext: string | null = null) {
    this._batchService
      .pairedBatches(page, this.pagesize, searchtext)
      .subscribe((data) => {
        this.batchArr = data.batches;
        this.totalCount = data.count;
        // this.batchArrForSort = data.batches;
      });
  }
  search(searchText: string) {
    this.page = 1;
    this.searchWord = searchText;
    this.getAll(this.page, searchText);
  }
  openLg(content: any, batch: pariedBatchesData | undefined) {
    const batchname = batch?.batch;
    this._batchService
      .getBatchMatarials(String(batchname))
      .subscribe((data) => {
        this.batchMatarialsArr = data;
        this.batchName = batchname;
        this.selectedBatch = batch;
        this._modalService.open(content, { size: 'xl', centered: true });
      });
  }

  printBatch(batch: pariedBatchesData) {
    const content = `
      <h1>Batch History</h1>
      ${this.renderBatchSummary(batch)}
    `;

    this.printDocument(`Batch - ${batch.batch}`, content);
  }

  printBatchDetails() {
    const content = `
      <h1>Batch Details</h1>
      ${
        this.selectedBatch
          ? this.renderBatchSummary(this.selectedBatch)
          : `<h2>${this.escapeHtml(this.batchName || '')}</h2>`
      }
      <h2>Materials</h2>
      ${this.renderMaterialTable(this.batchMatarialsArr || [])}
    `;

    this.printDocument(`Batch Details - ${this.batchName || ''}`, content);
  }

  printBatchMaterial(material: BatchMatarials) {
    const content = `
      <h1>Batch Material</h1>
      ${
        this.selectedBatch
          ? this.renderBatchSummary(this.selectedBatch)
          : `<h2>${this.escapeHtml(this.batchName || '')}</h2>`
      }
      <h2>Material</h2>
      ${this.renderMaterialTable([material])}
    `;

    this.printDocument(
      `Batch Material - ${this.batchName || ''} - ${material.name || ''}`,
      content
    );
  }

  private renderMaterialTable(materials: BatchMatarials[]): string {
    const rows = materials
      .map(
        (material) => `
          <tr>
            <td>${this.escapeHtml(material.uid)}</td>
            <td>${this.escapeHtml(material.name)}</td>
            <td>${this.escapeHtml(material.itemcode)}</td>
            <td>${this.formatPairStatus(material.machinepairstatus)}</td>
            <td>${this.formatPairStatus(material.scalepairingstatus)}</td>
          </tr>
        `
      )
      .join('');

    return `
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Item Code</th>
            <th>Machine Pair Status</th>
            <th>Scale Pair Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows || '<tr><td colspan="5" class="empty-row">No materials found</td></tr>'}
        </tbody>
      </table>
    `;
  }

  private renderBatchSummary(batch: pariedBatchesData): string {
    return `
      <table>
        <tbody>
          <tr>
            <th>Batch Name</th>
            <td>${this.escapeHtml(batch.batch)}</td>
          </tr>
          <tr>
            <th>Sku Code</th>
            <td>${this.escapeHtml(batch.skuCode)}</td>
          </tr>
          <tr>
            <th>Sku Name</th>
            <td>${this.escapeHtml(batch.skuName)}</td>
          </tr>
          <tr>
            <th>Job Order</th>
            <td>${this.escapeHtml(batch.sapOrderId)}</td>
          </tr>
          <tr>
            <th>Time Stamp</th>
            <td>${this.escapeHtml(this.formatDate(batch.timeStamp))}</td>
          </tr>
          <tr>
            <th>Machine Name</th>
            <td>${this.escapeHtml(batch.machineName)}</td>
          </tr>
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

  private formatDate(value: string | undefined): string {
    if (!value) {
      return '';
    }

    return new Date(value).toLocaleString();
  }

  private formatPairStatus(status: number): string {
    return status === 1 ? 'Paired' : 'Not Paired';
  }

  private escapeHtml(value: string | number | undefined | null): string {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
    this.getAll(this.page, this.searchWord || null);
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

import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Transformars, TransformersRead } from '../../model/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { start } from 'repl';
import { end } from '@popperjs/core';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/core/services/Auth.service';
import { AppService } from 'src/app/core/services/app-Service.service';
import { factory } from 'src/app/core/models/filter';
// import { saveAs } from 'file-saver';
@Component({
  selector: 'app-energy-report',
  templateUrl: './energy-report.component.html',
  styleUrls: ['./energy-report.component.scss'],
})
export class EnergyReportComponent implements OnInit {
  form: FormGroup;
  selectedtransformer: string;
  transformers: Transformars[];
  page: number = 1;
  totalCount: number;
  tranformerRead: TransformersRead[] = [];
  totalEnergyConsumption: number;

  lastDay: string = '';
  minDate: string = '';
  today: string = '';
  nextDay: string = '';
  // fromDate = new Date();
  lastYearTotal: number;
  thisYearTotal: number;
  selectedFactory: number;
  customBtnClicked: boolean = false;
  FactoriesDropDown: factory[];
  minToDate: any;
  date = new Date();
  fromDate: Date = new Date();
  toDate: Date = new Date();
  maxToDate: Date | undefined;
  accessToFactories: boolean = true;
  private intervalId: any;
  factoryId: number;
  constructor(
    private _reportServices: ReportsService,
    private _fb: FormBuilder,
    public _authService: AuthService,
    private _appService: AppService
  ) {}

  ngOnInit(): void {
    this.initFrom();
    this.GetAllFactories();
    // this.getTransformers(2);
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    this.lastDay = todayDate.toISOString().split('T')[0];

    let todayDay = new Date();
    this.today = todayDay.toISOString().split('T')[0];

    let tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate());
    this.nextDay = tomorrowDate.toISOString().split('T')[0];
  }

  GetAllFactories() {
    if (
      this._authService.isHasAccessToE2() &&
      this._authService.isHasAccessToE1()
    ) {
      this._appService.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
        this.accessToFactories = true;
        // this.factorybreadcrumb = this.FactoriesDropDown.find(
        //   (x) => this.selectedFactory == x.id
        // )?.name;
      });
    } else if (this._authService.isHasAccessToE2()) {
      this.selectedFactory = 3;
      // this.selectedLine = 29;
      // this.factorybreadcrumb = 'EIPICO2';
      this.accessToFactories = false;
    } else if (this._authService.isHasAccessToE1()) {
      this.selectedFactory = 2;
      // this.factorybreadcrumb = 'EIPICO1';
      this.accessToFactories = false;
    }
  }

  initFrom() {
    this.form = this._fb.group({
      from: new Date(),
      to: new Date(),
    });
  }

  getTransformersPerFatory(factoryId: number) {
    this._reportServices.GetAllTransformars(factoryId).subscribe((data) => {
      console.log(factoryId);
      this.transformers = data;
      console.log(this.transformers);
    });
  }

  // getTransformers(factoryId: number) {
  //   this._reportServices.GetAllTransformars(factoryId).subscribe((data) => {

  //     this.transformers = data;
  //   });
  // }

  getTransformerReads() {
    const start = this.form.get('from')?.value;
    const end = this.form.get('to')?.value;
    const page = this.page;
    this._reportServices
      .TransformersReads(this.selectedtransformer, page, 20, start, end)
      .subscribe((data) => {
        this.tranformerRead = data.consumption;
        this.totalCount = data.totalCount;
        this.totalEnergyConsumption = data.totalEnergyConsumption;
      });
  }

  customDate() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.customBtnClicked = !this.customBtnClicked;
    if (this.customBtnClicked) {
      this.form.get('start')?.setValidators(Validators.required);
      this.form.get('to')?.setValidators(Validators.required);
    } else {
      this.form.get('start')?.clearValidators();
      this.form.get('to')?.clearValidators();
      this.form.get('start')?.reset();
      this.form.get('to')?.reset();
    }
  }

  liveData() {
    this.form.patchValue({
      from: this.today,
      to: this.today,
    });
    this.getTransformerReads();
    this.intervalId = setInterval(() => {
      this.getTransformerReads();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getTransformerReads();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      // let report = this.validationReport;
      // report = report.map(({ checked, ...rest }) => {
      //   const { description, ...restWithoutTHV } = rest;
      //   return restWithoutTHV;
      // });
      const worksheet = xlsx.utils.json_to_sheet(this.tranformerRead);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Energy');
    });
  }

  loadLazy(event: any) {
    this.page = event.first / event.rows + 1;
    this.onTableDataChange(this.page);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  onFromDateChange(selectedDate: string): void {
    this.lastDay = selectedDate;
  }
}

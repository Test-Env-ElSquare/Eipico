import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Transformars, TransformersRead } from '../../model/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/core/services/Auth.service';
import { AppService } from 'src/app/core/services/app-Service.service';
import { factory } from 'src/app/core/models/filter';
import { SignalREnergyService } from '../../services/signal-R-energy/signal-r-energy.service';

@Component({
  selector: 'app-energy-report',
  templateUrl: './energy-report.component.html',
  styleUrls: ['./energy-report.component.scss'],
})
export class EnergyReportComponent implements OnInit {
  form: FormGroup;
  selectedtransformer: string;
  transformers: Transformars[];
  sizes!: any[];
  selectedSize: any = '';
  page: number = 1;
  totalCount: number;
  tranformerRead: TransformersRead[] = [];
  tranformerReadCustom: any;
  totalEnergyConsumption: number;
  receivedData: any;
  lastDay: string = '';
  minDate: string = '';
  today: string = '';
  nextDay: string = '';
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
  factoryId: number;
  isCustomSearch = false;
  selectedName: string = 'lineToNeutral';

  selectOptions = [
    { name: 'lineToNeutral' },
    { name: 'lineToLine' },
    { name: 'currents' },
    { name: 'powerFactor' },
    { name: 'activePower' },
    { name: 'apparentPower' },
  ];
  object: any = {
    lineToNeutral: ['v1', 'v2', 'v3'],
    lineToLine: ['v1', 'v2', 'v3'],
    currents: ['i1', 'i2', 'i3'],
    powerFactor: ['pf1', 'pf2', 'pf3'],
    activePower: ['p1', 'p2', 'p3'],
    apparentPower: ['p1', 'p2', 'p3'],
  };

  get selectedItem() {
    return this.object[this.selectedName] || [];
  }
  constructor(
    private _reportServices: ReportsService,
    private _fb: FormBuilder,
    public _authService: AuthService,
    private _appService: AppService,
    private _energyService: SignalREnergyService
  ) {}

  ngOnInit(): void {
    this.initFrom();
    this.getAllFactories();
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    this.lastDay = todayDate.toISOString().split('T')[0];
    let todayDay = new Date();
    this.today = todayDay.toISOString().split('T')[0];
    let tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate());
    this.nextDay = tomorrowDate.toISOString().split('T')[0];
  }
  initFrom() {
    this.form = this._fb.group({
      from: new Date(),
      to: new Date(),
    });
  }
  getAllFactories() {
    this._appService.GetAllFactories().subscribe({
      next: (res) => {
        this.FactoriesDropDown = res;
        console.log(this.FactoriesDropDown);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getTransformersPerFatory(factoryId: number) {
    this._reportServices.GetAllTransformars(factoryId).subscribe((data) => {
      console.log(factoryId);
      this.transformers = data;
      console.log(this.transformers);
    });
  }
  initializeSignalR(sourceId: string) {
    this._energyService.startConnection(sourceId).then(() => {
      this._energyService.energyUpdate((data) => {
        console.log('Received SignalR Data:', data);

        this.tranformerRead = [data];
      });
    });
  }

  liveData() {
    const sourceId = this.selectedtransformer;
    this._energyService.startConnection(sourceId).then(() => {
      this._energyService.energyUpdate((data) => {
        this.tranformerRead = [data];
        this.customBtnClicked = false;
        this.isCustomSearch = false;
        this.tranformerReadCustom = [];
      });
    });
  }

  getTransformerReads() {
    const start = this.form.get('from')?.value;
    const end = this.form.get('to')?.value;
    this._reportServices
      .TransformersReads(this.selectedtransformer, start, end)
      .subscribe((data) => {
        this.tranformerReadCustom = data.consumption;
        console.log(this.tranformerReadCustom);
        this.totalEnergyConsumption = data.totalEnergyConsumption || 0;
        this.tranformerRead = [];
      });
  }

  customDate() {
    this.customBtnClicked = true;
    this.isCustomSearch = true;
    this._energyService.stopConnection();
    // this.tranformerReadCustom = [];
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.tranformerRead);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Energy');
    });
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
  ngOnDestroy() {
    this._energyService.stopConnection();
  }
}

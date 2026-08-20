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
  previousTransformerRead: TransformersRead | null = null;
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
  energyChartOptions: any;
  selectedMetricGroup = 'energy';

  metricGroups = [
    {
      label: 'Energy',
      value: 'energy',
      columns: [
        { key: 'diffEnergy1', label: 'Diff Energy 1' },
        { key: 'diffEnergy2', label: 'Diff Energy 2' },
        { key: 'diffEnergy3', label: 'Diff Energy 3' },
        { key: 'energy1', label: 'Energy 1' },
        { key: 'energy2', label: 'Energy 2' },
        { key: 'energy3', label: 'Energy 3' },
        { key: 'totalEnergyConsumption', label: 'Total Energy' },
      ],
    },
    {
      label: 'Voltage',
      value: 'voltage',
      columns: [
        { key: 'v1', label: 'V1' },
        { key: 'v2', label: 'V2' },
        { key: 'v3', label: 'V3' },
      ],
    },
    {
      label: 'Current',
      value: 'current',
      columns: [
        { key: 'i1', label: 'I1' },
        { key: 'i2', label: 'I2' },
        { key: 'i3', label: 'I3' },
      ],
    },
    {
      label: 'Power Factor',
      value: 'powerFactor',
      columns: [
        { key: 'pF1', label: 'PF1' },
        { key: 'pF2', label: 'PF2' },
        { key: 'pF3', label: 'PF3' },
      ],
    },
    {
      label: 'Power',
      value: 'power',
      columns: [
        { key: 'pact1', label: 'Pact1' },
        { key: 'pact2', label: 'Pact2' },
        { key: 'papp1', label: 'Papp1' },
        { key: 'papp2', label: 'Papp2' },
        { key: 'papp3', label: 'Papp3' },
        { key: 'preact1', label: 'Preact1' },
        { key: 'preact2', label: 'Preact2' },
        { key: 'preact3', label: 'Preact3' },
      ],
    },
    {
      label: 'Harmonics',
      value: 'harmonics',
      columns: [
        { key: 'thDi1', label: 'ThDi1' },
        { key: 'thDi2', label: 'ThDi2' },
        { key: 'thDi3', label: 'ThDi3' },
        { key: 'thDv1', label: 'ThDv1' },
        { key: 'thDv2', label: 'ThDv2' },
        { key: 'thDv3', label: 'ThDv3' },
      ],
    },
    {
      label: 'Status',
      value: 'status',
      columns: [
        { key: 'fault', label: 'Fault' },
      ],
    },
  ];

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

  get selectedMetricColumns(): any[] {
    return (
      this.metricGroups.find((group) => group.value === this.selectedMetricGroup)
        ?.columns || []
    );
  }

  get selectedMetricGroupLabel(): string {
    return (
      this.metricGroups.find((group) => group.value === this.selectedMetricGroup)
        ?.label || ''
    );
  }

  get liveRead(): TransformersRead | null {
    return this.tranformerRead?.length ? this.tranformerRead[0] : null;
  }

  get liveTimestamp(): string | null {
    return (this.liveRead as any)?.timeStamp || null;
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
      factoryId: [null, Validators.required],
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
    this.selectedFactory = factoryId;
    this.selectedtransformer = '';
    this.tranformerRead = [];
    this.previousTransformerRead = null;
    this.tranformerReadCustom = [];
    this.energyChartOptions = null;

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
        this.previousTransformerRead = this.liveRead;
        this.tranformerRead = [data];
        this.buildLiveChart();
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
        this.previousTransformerRead = null;
        this.buildCustomChart();
      });
  }

  customDate() {
    this.customBtnClicked = true;
    this.isCustomSearch = true;
    this.previousTransformerRead = null;
    this._energyService.stopConnection();
    // this.tranformerReadCustom = [];
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const exportRows = this.getExcelRows();
      const worksheet = xlsx.utils.json_to_sheet(exportRows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Energy');
    });
  }

  getExcelRows(): any[] {
    if (this.customBtnClicked && this.isCustomSearch) {
      return (this.tranformerReadCustom || []).map((energy: any) => {
        const row: any = {
          Plant: this.selectedFactoryName,
          Transformer: this.selectedtransformer || '',
          Day: this.formatDateForExcel(energy.startDay),
          'Total Energy': energy.totalEnergyConsumption,
        };

        this.selectedItem.forEach((key: string) => {
          const label = key.toUpperCase();
          row[`Min ${label}`] = energy[this.selectedName]?.min?.[key];
          row[`Max ${label}`] = energy[this.selectedName]?.max?.[key];
          row[`Avg ${label}`] = energy[this.selectedName]?.avg?.[key];
        });

        return row;
      });
    }

    return (this.tranformerRead || []).map((item: TransformersRead) => ({
      Plant: this.selectedFactoryName,
      Transformer: this.selectedtransformer || item.sourceId || '',
      'Shift Start Time': this.formatDateForExcel(item.shiftStartTime),
      'Diff Energy 1': item.diffEnergy1,
      'Diff Energy 2': item.diffEnergy2,
      'Diff Energy 3': item.diffEnergy3,
      'Energy 1': item.energy1,
      'Energy 2': item.energy2,
      'Energy 3': item.energy3,
      Fault: item.fault,
      I1: item.i1,
      I2: item.i2,
      I3: item.i3,
      PF1: item.pF1,
      PF2: item.pF2,
      PF3: item.pF3,
      Pact1: item.pact1,
      Pact2: item.pact2,
      Pact3: item.pact3,
      Papp1: item.papp1,
      Papp2: item.papp2,
      Papp3: item.papp3,
      Preact1: item.preact1,
      Preact2: item.preact2,
      Preact3: item.preact3,
      ThDi1: item.thDi1,
      ThDi2: item.thDi2,
      ThDi3: item.thDi3,
      ThDv1: item.thDv1,
      ThDv2: item.thDv2,
      ThDv3: item.thDv3,
      V1: item.v1,
      V2: item.v2,
      V3: item.v3,
      'Total Energy': item.totalEnergyConsumption,
      'Time Stamp': this.formatDateForExcel((item as any).timeStamp),
    }));
  }

  get selectedFactoryName(): string {
    return (
      this.FactoriesDropDown?.find((factory) => factory.id === this.selectedFactory)
        ?.name || ''
    );
  }

  onMetricGroupChange(): void {
    if (this.customBtnClicked && this.isCustomSearch) {
      this.syncCustomMetricSelection();
      this.buildCustomChart();
      return;
    }

    this.buildLiveChart();
  }

  syncCustomMetricSelection(): void {
    const selectedNameByGroup: any = {
      voltage: 'lineToNeutral',
      current: 'currents',
      powerFactor: 'powerFactor',
      power: 'activePower',
    };

    this.selectedName = selectedNameByGroup[this.selectedMetricGroup] || this.selectedName;
  }

  buildLiveChart(): void {
    const read = this.liveRead;
    if (!read) {
      this.energyChartOptions = null;
      return;
    }

    const columns = this.selectedMetricColumns;
    const series = [
      {
        name: 'Current',
        data: columns.map((column) => this.getMetricValue(read, column.key)),
      },
    ];

    if (this.previousTransformerRead) {
      series.push({
        name: 'Previous',
        data: columns.map((column) =>
          this.getMetricValue(this.previousTransformerRead, column.key)
        ),
      });
    }

    this.energyChartOptions = {
      series,
      chart: {
        type: 'bar',
        height: 320,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: '42%',
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: false },
      colors: ['#0d6efd', '#adb5bd'],
      xaxis: {
        categories: columns.map((column) => column.label),
      },
      yaxis: {
        title: { text: this.selectedMetricGroupLabel },
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value}`,
        },
      },
    };
  }

  buildCustomChart(): void {
    const rows = this.tranformerReadCustom || [];
    const selectedItems = this.selectedItem;

    this.energyChartOptions = {
      series: [
        ...selectedItems.map((key: string) => ({
          name: `Avg ${key.toUpperCase()}`,
          data: rows.map((item: any) => item[this.selectedName]?.avg?.[key] || 0),
        })),
        {
          name: 'Total Energy',
          type: 'column',
          data: rows.map((item: any) => item.totalEnergyConsumption || 0),
        },
      ],
      chart: {
        type: 'line',
        height: 340,
        toolbar: { show: true },
        zoom: { enabled: true },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.28,
          opacityTo: 0.04,
          stops: [0, 90, 100],
        },
      },
      colors: ['#0d6efd', '#20c997', '#f59f00', '#198754'],
      xaxis: {
        categories: rows.map((item: any) => this.formatDateForExcel(item.startDay)),
      },
      yaxis: {
        title: { text: this.selectedName },
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value}`,
        },
      },
    };
  }

  getMetricValue(item: any, key: string): number {
    const value = item?.[key];
    return value === null || value === undefined ? 0 : Number(value);
  }

  getMetricDisplayValue(item: any, key: string): number | string {
    const value = item?.[key];
    return value === null || value === undefined ? '-' : value;
  }

  getMetricDifference(key: string): number | null {
    if (!this.liveRead || !this.previousTransformerRead) {
      return null;
    }

    return (
      this.getMetricValue(this.liveRead, key) -
      this.getMetricValue(this.previousTransformerRead, key)
    );
  }

  formatDateForExcel(value: string | Date): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toISOString().split('T')[0];
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

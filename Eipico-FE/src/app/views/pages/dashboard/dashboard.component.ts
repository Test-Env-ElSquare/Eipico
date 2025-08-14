import { Component, Input, OnInit, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { AppServiceService } from '../../../core/services/app-Service.service';
import { Router } from '@angular/router';
import { UserFilter } from 'src/app/core/models/filter';
import {
  ApexAxisChartSeries,
  ApexGrid,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexStroke,
  ApexLegend,
  ApexTooltip,
  ApexDataLabels,
  ApexFill,
  ApexPlotOptions,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HC_timeLine from "highcharts/modules/timeline";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HC_timeLine(Highcharts);
// HC_de(Highcharts);
export type apexChartOptions = {
  basicModalCode: any;
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  labels: string[];
  title: ApexTitleSubtitle;
};
const basicModal = {
  htmlCode:
`<!-- Button trigger modal -->
<button class="btn btn-primary" (click)="openBasicModal(basicModal)">Launch demo modal</button>
<!-- Modal -->
<ng-template #basicModal let-modal>
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
    <button type="button" class="btn-close" (click)="modal.close('by: close icon')" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <p>Modal body</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="modal.close('by: close button')">Close</button>
    <button type="button" class="btn btn-primary" (click)="modal.close('by: save button')">Save changes</button>
  </div>
</ng-template>
<!-- Close result -->
<p *ngIf="basicModalCloseResult != ''" class="mt-2">{{basicModalCloseResult}}</p>`,
  tsCode:
`import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  basicModalCloseResult: string = '';

  constructor(private modalService: NgbModal) { }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
}`
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis[];
  markers: ApexMarkers;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  labels: string[];
  title: ApexTitleSubtitle;

};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true,
})
export class DashboardComponent implements OnInit ,OnChanges{
  /* Apex chart*/
  // colors and font variables for apex chart
  public basicCircleOptions: any = {};
  public barChartOptions: any = {};

  obj = {
    primary: '#6571ff',
    secondary: '#7987a1',
    success: '#37FAE0',
    info: '#66d1d1',
    warning: '#fbbc06',
    danger: '#ff3366',
    light: '#e9ecef',
    dark: '#DE4E90',
    green:"#22FA0E",
    muted: '#7987a1',
    gridBorder: 'rgba(77, 138, 240, .15)',
    bodyColor: '#000',
    cardBg: '#fff',
    fontFamily: "'Roboto', Helvetica, sans-serif",
  };
  basicModalCode: any;
  basicModalCloseResult: string = '';
filter:UserFilter = new UserFilter ();
public TimeLineChartOptionsL: any = {};
  @Input() dashboardData :any
  dashboard:any
  sucess: any;
  waterFallData:any = []
  cache_key:string = "CashedDataDashborad";
  sucess_key:string = "Dashboradsucess";
  showData: boolean =true;
  sle: any;
  constructor(private modalService: NgbModal ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.GetDashBoradData()
  }
   // ngOnInit()
  ngOnInit(): void {
    this.basicModalCode = basicModal;
  }
  GetDashBoradData(){
    this.dashboard = this.dashboardData
    console.log(this.dashboard)
    // localStorage[this.cache_key] = JSON.stringify(data)
  this.waterFallData =   this.dashboard?.waterFall
    this.sle = this.dashboard?.sle
      console.log(this.waterFallData)
    this.TimeLineChartOptionsL = this.getTimeLineChartOptions(this.obj,this.dashboard?.timeLine);
    this.barChartOptions = getBarChartOptions(this.obj,this.waterFallData);
}
  openBasicModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
    }).catch((res) => {});
  }


  // rangeBarGroupRows: true,

  private getTimeLineChartOptions(obj: any,timeLine:any)
  {
    return {
      series: timeLine,
      chart: {
        height: 200,
        type: "rangeBar",

      },

      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          rangeBarGroupRows: true
        }
      },

      xaxis: {
        type: "datetime"
      },
      legend: {
        position: "right",
        show:false,

      },
               colors: [
          "#008FFB",

        ],
      dataLabels: {
        enabled: false,
        colors: [obj.primary, obj.danger, obj.warning],

      },
      tooltip: {
        fillSeriesColor: true,
        enabled: true,

      },

  }
  }



}
/**
 * Line chart options
 */


 function getBarChartOptions(obj: any,data:any) {
  return {
    series: [
        {
          data:data
        }
    ],
    chart: {
      type: 'rangeBar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      textAnchor: "middle",

      enabled: true,
      style: {
        colors: ["#000"],
      },
    },
    legend: {
      fontWeight: 900,
    },

    xaxis: {
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,

        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 900,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: "13px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-label",
        },
      },
    },
}
};

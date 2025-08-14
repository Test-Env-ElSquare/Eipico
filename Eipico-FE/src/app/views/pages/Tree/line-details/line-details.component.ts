import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsBullet from 'highcharts/modules/bullet';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HighchartsBullet(Highcharts);
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';
import { AppServiceService } from 'src/app/core/services/app-Service.service';
import { Realtime } from 'src/app/core/services/realtime.service';
import { ToastrService } from 'ngx-toastr';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-line-details',
  templateUrl: './line-details.component.html',
  styleUrls: ['./line-details.component.scss'],
})
export class LineDetailsComponent implements OnInit, OnDestroy {
  guageOptions: any = {
    chart: {
      type: 'solidgauge',
      animations: {
        enabled: false,
      },
    },

    title: null,

    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 500,
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'], // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
      },
      labels: {
        y: 16,
      },
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    series: [
      {
        name: 'Speed',
        data: [50],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">km/h</span>' +
            '</div>',
        },
        tooltip: {
          valueSuffix: ' km/h',
        },
        credits: {
          enabled: false,
        },
      },
    ],
  };

  obj = {
    primary: '#57769a',
    secondary: '#7987a1',
    success: '#a1ca70',
    info: '#66d1d1',
    warning: '#f0d27b',
    danger: '#BD2A2E',
    light: '#e9ecef',
    dark: '#DE4E90',
    green: '#486966',
    muted: '#7987a1',
    gridBorder: 'rgba(77, 138, 240, .15)',
    bodyColor: '#000',
    cardBg: '#fff',
    fontFamily: "'Roboto', Helvetica, sans-serif",
  };
  FactoryName: any;
  line: any;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptionscircle1: any = {};
  public TimeLineChartOptionsL: any = {};
  public GugechartOptions: any = {};
  Date: Date = new Date();
  packetHourProductionShift1: any;
  packetHourProductionShift2: any;
  packet_Production1: any;
  packet_Production2: any;
  shift1sle: any;
  shift2sle: any;
  timeline: any;
  skuShift2: any;
  sku: any;
  data: any;
  Placeholder: boolean = true;
  color: any;
  currentShift: any;
  availability: any;
  currentSpeeddata: any = [];
  ratedSpeed: any;
  currentpeed: any;
  Planed: any;
  Actual: any;
  shift1PPtP: any;
  shift2PPtP: any;
  ActualShift1: any;
  ActualShift2: any;
  constructor(
    public _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _AppServiceService: AppServiceService,
    private _Realtime: Realtime,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.FactoryName = this._ActivatedRoute.snapshot.params['FName'];
    this.line = this._ActivatedRoute.snapshot.params['line'];
    this.GetlineView();
    this._Realtime.startConnection();
    this.startConnection();
  }
  ngOnDestroy(): void {
    this._Realtime.hubConnection.stop();
  }
  startConnection() {
    this._Realtime.hubConnection.on(
      `LineView${this.FactoryName}${this.line}`,
      (data: any) => {
        this.GetlineView();
      }
    );
  }
  changeColor(val: any) {
    if (val == 1) {
      this.obj.success = '#000';
    } else {
      this.obj.success = '#7cb5ec';
    }
  }

  GetlineView() {
    this._AppServiceService
      .GetLineDetails(this.FactoryName, this.line)
      .subscribe((data: any) => {
        console.log(data, '');
        this.data = [];
        this.data = data[0];
        this.Placeholder = false;
        this.currentShift = this.data.currentShift;
        this.ratedSpeed = this.data.shift1.ratedSpeed;
        this.currentpeed = this.data.shift1.currentSpeed;
        this.sku = this.data.shift1.sku;
        this.shift1sle = this.data.shift1.sle;
        this.shift2sle = this.data.shift2.sle;
        this.shift1PPtP = this.data.shift1.pptp;
        this.shift2PPtP = this.data.shift2.pptp;
        this.ActualShift1 = this.data.shift1.packet_Production[0][1];
        this.ActualShift2 = this.data.shift2.packet_Production[0][1];
        // this.availability = this.data.shift1.availability
        //   ? (this.data.shift1.availability * 100).toFixed(0)
        //   : 0;
        // this.color = this.changeSleColor(this.shift1sle)
        this.TimeLineChartOptionsL = this.getTimeLineChartOptions(
          this.obj,
          this.data.shift1.timeline
        );
        this.createlineChart(
          this.data.shift1.packet_Hour_Production,
          'column',
          'chart-line1',
          'Cases',
          this.obj.primary
        );
        //
        this.ActualcreatelineChart(
          this.data.shift2.packet_Production[0][1],
          this.data.shift2.packet_Production[1][1].target,
          'bullet',
          'chart-line2',
          'Total Cases Production (Planned vs. Actual) - Shift 2',
          this.obj.success
        );
        this.ActualcreatelineChart(
          this.data.shift1.packet_Production[0][1],
          this.data.shift1.packet_Production[1][1].target,
          'bullet',
          'chart-line3',
          'Total Cases Production (Planned vs. Actual) - Shift 1',
          this.obj.success
        );
        // this.changeColor(1);

        this.createGuageChart('guageSpeed1', this.currentpeed, this.ratedSpeed);
      });
  }

  private createlineChart(
    data: any,
    type: any,
    id: any,
    text: any,
    color: any
  ): void {
    Highcharts.chart(id, {
      chart: {
        animations: {
          enabled: false,
        },
        type: type,
      },
      title: {
        text: text,
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: 'Packets : <b>{point.y:.1f}</b>',
      },
      plotOptions: {
        series: {
          animation: false,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%',
          },
        },
      },
      series: [
        {
          name: 'Population',
          data: data,
          color: color,
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
      ],
    } as any);
  }

  private ActualcreatelineChart(
    Actual: any,
    planed: any,
    type: any,
    id: any,
    text: any,
    color: any
  ): void {
    Highcharts.chart(id, {
      chart: {
        inverted: true,
        marginLeft: 50,
        type: type,
        animations: {
          enabled: false,
        },
      },
      title: {
        text: text,
      },
      legend: {
        enabled: false,
      },

      plotOptions: {
        series: {
          pointPadding: 0.25,
          borderWidth: 0,
          color: this.obj.primary,
          targetOptions: {
            width: '200%',
          },
        },
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      yAxis: {
        animations: {
          enabled: false,
        },
        plotBands: [
          {
            from: 0,
            to: 50000,
            color: this.obj.success,
          },
        ],
        //   {
        //       from: 5000,
        //       to: 8000,
        //       color: this.obj.warning
        //   }, {
        //       from: 8000,
        //       to: planed,
        //       color: this.obj.success
        //   }
        // ],
        title: null,
      },
      series: [
        {
          animations: {
            enabled: false,
          },
          data: [
            {
              y: Actual,
              target: planed,
            },
          ],
        },
      ],
      tooltip: {
        pointFormat:
          '<b> Actual {point.y} </b> (with planed at {point.target})',
      },
    } as any);
  }
  public createGuageChart(id: any, series: any, max: any): void {
    Highcharts.chart({
      chart: {
        type: 'solidgauge',
        animations: {
          enabled: false,
        },
        renderTo: id,
        defaultSeriesType: 'solidgauge',
        events: {
          load: true,
        },
      },

      title: null,

      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },

      exporting: {
        enabled: false,
      },

      tooltip: {
        enabled: false,
      },

      // the value axis
      yAxis: {
        min: 0,
        max: max,
        stops: [
          [0.1, this.obj.success], // green
          [20000, this.obj.success], // yellow
          [40000, this.obj.success], // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70,
        },
        labels: {
          y: 16,
        },
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      series: [
        {
          name: 'Speed',
          data: [series],
          dataLabels: {
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}</span><br/>' +
              '<span style="font-size:12px;opacity:0.4">BPH</span>' +
              '</div>',
          },
          tooltip: {
            valueSuffix: 'BPH',
          },
          credits: {
            enabled: false,
          },
        },
      ],
    } as any);
  }

  private getTimeLineChartOptions(obj: any, timeline: any = []) {
    return {
      series: timeline,
      chart: {
        height: 100,
        type: 'rangeBar',
        animations: {
          enabled: false,
        },
      },

      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%',
          rangeBarGroupRows: true,
        },
      },
      colors: ['#008FFB'],
      fill: {
        type: 'solid',
      },

      xaxis: {
        type: 'datetime',
      },
      legend: {
        position: 'right',
        show: false,
      },
      dataLabels: {
        enabled: false,
        colors: [obj.primary, obj.danger, obj.warning],
      },
      tooltip: {
        x: {
          formatter: function (value: any) {
            return ` <span class="fw-bolder text-primary">Day</span> ${new Date(
              value
            ).getUTCDate()}/${new Date(value).getUTCMonth()}/${new Date(
              value
            ).getUTCFullYear()} <span class="fw-bolder text-danger">Time</span> ${new Date(
              value
            ).getUTCHours()}:${new Date(value).getUTCMinutes()}:${new Date(
              value
            ).getUTCSeconds()}
            `;
          },
        },
      },
    };
  }

  stopCon() {
    this._Realtime.hubConnection.stop();
    this.toastr.error('Disconnected');
  }
  StartCon() {
    this._Realtime.startConnection();
    this.startConnection();
    this.toastr.success('Connected');
  }
}

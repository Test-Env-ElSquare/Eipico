import { Component, OnInit } from '@angular/core';
import { radialBar } from 'src/app/core/Chartoptions/ChartOptions';
import { AppServiceService } from '../../../../core/services/app-Service.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  public SleChartOptions: any = {};
  public AvailabilityChartOptions: any = {};
  // public SleChartOptions: any = {};
  public TimelineChartOptions: any = {};
  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#000",
    cardBg         : "#fff",
    fontFamily     : "'Roboto', Helvetica, sans-serif"
  }
  Sle:any =[]
  avalability:any =[]
  MachineIndicator: any;
  constructor(private _AppServiceService:AppServiceService) {
    this.SleChartOptions  = new radialBar([])
    this.AvailabilityChartOptions  = new radialBar([])

  }
  ngOnInit(): void {
    this.TimelineChartOptions = GEtTimeLine(this.obj);
    this._AppServiceService.GetMachineIndicator().subscribe((data:any)=>{
      this.MachineIndicator = data.data[0]
      this.Sle = this.MachineIndicator.machineindicator[0].oee
      this.avalability = this.MachineIndicator.machineindicator[0].avalability
      this.SleChartOptions.series = [this.Sle * 100]
      this.AvailabilityChartOptions.series = [(this.avalability * 100).toFixed(1)]


    })

  }
  // private x(){
  //   this.radialBarChartOptions  = new radialBar(this?.Sle * 100)

  // }
/**
 * Line chart options
 */

}



function GEtTimeLine(obj: any,)
{
  return {
    series: [
      {
        name: "Bob",
        data: [
          {
            x: "Design",
            y: [
              new Date("2019-03-05").getDate(),
              new Date("2019-03-08").getDate()
            ]
          },
        ]
      },
      {
        name: "Joe",
        data: [
          {
            x: "Design",
            y: [
              new Date("2019-03-02").getDate(),
              new Date("2019-03-05").getDate()
            ]
          },
        ]
      },

    ],    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
        },
      },
    ],
    legend: {
      show: false,
      position: 'right',
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 0,
        vertical: 0,
      },
    },
    chart: {
      height: 100,
      animations: {
        enabled: false,
      },
      type: 'rangeBar',
      toolbar: {
        show: false,
      },

    },

    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true,
      },
    },

    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 1,
      labels: {
        datetimeUTC: false,
        format: 'HH:mm',
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 800,
          cssClass: 'apexcharts-xaxis-label',

        },
      },
    },
    yaxis: {
      padding: 0,
      show: true,

    },


    tooltip: {
      enabled: true,
      style: {
        fontSize: '20px',
        fontFamily: 'Roboto'
      },
      x: {
        show: true,
        format:'HH:mm'
      },
      y: {
        formatter:(value:any) => `${value}$`
      },
      marker: {
        show: false,
      },
      theme:'dark'
    },
}
}

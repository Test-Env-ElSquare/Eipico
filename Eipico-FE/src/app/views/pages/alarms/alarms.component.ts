import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HC_timeLine from "highcharts/modules/timeline";
import Drilldown  from "highcharts/modules/drilldown";
import colorAxis from "highcharts/modules/coloraxis";

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HC_timeLine(Highcharts);
Drilldown(Highcharts);
colorAxis(Highcharts);
@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.PiechartOptions("Piechart");
    this.PiechartOptions("Piechart2");
  }
  private PiechartOptions(id:any)
  {
    Highcharts.chart(id, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Browser<br>shares<br>January<br>2022',
        align: 'center',
        verticalAlign: 'middle',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            size: '80%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: [
            ['Chrome', 73.86],
            ['Edge', 11.97],
            ['Firefox', 5.52],
            ['Safari', 2.98],
            ['Internet Explorer', 1.90],
            {
                name: 'Other',
                y: 3.77,
                dataLabels: {
                    enabled: false
                }
            }
        ]
    }]

  } as any );
  }
}

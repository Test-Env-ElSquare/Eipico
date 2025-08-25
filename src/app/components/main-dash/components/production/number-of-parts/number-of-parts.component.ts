import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-number-of-parts',
  templateUrl: './number-of-parts.component.html',
  styleUrls: ['./number-of-parts.component.scss']
})
export class NumberOfPartsComponent implements OnChanges {
  @Input() numOfPartsandtotalEnergy: any;
  public chartOptions!: any;

  ngOnChanges() {
    if (this.numOfPartsandtotalEnergy) {
      this.chartOptions = {
        series: [
          {
            name: "Eipico1",
            data: [this.numOfPartsandtotalEnergy[0].y]
          },
          {
            name: "Eipico2",
            data: [this.numOfPartsandtotalEnergy[1].y]
          }
        ],
        chart: {
          type: "bar",
          stacked: true,
          height: 150,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50%",
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number) => val.toLocaleString(),
          style: {
            colors: ['#000', '#fff']
          }
        },
        xaxis: {
          labels: { show: false },
          axisTicks: { show: false },
          axisBorder: { show: false },
          categories: ["", ""]
        },
        yaxis: {
          labels: { show: false }
        },
        title: {
          text: "Number of Parts",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "bold"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "left"
        },
        colors: ["#A0DBFB", "#0083CB"],
      };
    }
  }
}
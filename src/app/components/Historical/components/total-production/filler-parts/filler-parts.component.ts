import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { fillers } from '../../../models/model';

@Component({
  selector: 'app-filler-parts',
  templateUrl: './filler-parts.component.html',
  styleUrls: ['./filler-parts.component.scss']
})
export class FillerPartsComponent implements OnChanges {
  @Input() filler: fillers;

  public chartOptions!: any;

  ngOnChanges() {
    if (this.filler) {
      this.chartOptions = {
        series: [
          {
            name: "Good Parts",
            data: [this.filler.count]
          },
          {
            name: "Reject Parts",
            data: [this.filler.qreject]
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
          formatter: (val: number) => val.toLocaleString()
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
          text: "Parts",
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
        colors: ["#079455", "#EF4444"],
      };
    }
  }
}

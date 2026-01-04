import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { fillers } from '../../../models/model';

@Component({
  selector: 'app-filler-parts',
  templateUrl: './filler-parts.component.html',
  styleUrls: ['./filler-parts.component.scss'],
})
export class FillerPartsComponent implements OnChanges {
  @Input() filler: fillers;

  public chartOptions!: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log('Current filler:', this.filler);

    if (
      !this.filler ||
      this.filler.count == null ||
      this.filler.qreject == null
    ) {
      return;
    }

    this.chartOptions = {
      series: [
        {
          name: 'Good Parts',
          data: [this.filler.count],
        },
        {
          name: 'Reject Parts',
          data: [this.filler.qreject],
        },
      ],
      chart: {
        type: 'bar',
        stacked: true,
        height: 150,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toLocaleString(),
      },
      xaxis: {
        labels: { show: false },
        axisTicks: { show: false },
        axisBorder: { show: false },
        categories: [''],
      },
      yaxis: {
        labels: { show: false },
      },
      colors: ['#079455', '#EF4444'],
    };
  }
}

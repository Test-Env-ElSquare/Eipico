import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { fillers } from '../../../models/model';

@Component({
  selector: 'app-filler-parts',
  templateUrl: './filler-parts.component.html',
  styleUrls: ['./filler-parts.component.scss'],
})
export class FillerPartsComponent implements OnChanges {
  @Input() filler: fillers | null;

  public chartOptions!: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log('FillerPartsComponent Input Changed:', this.filler);

    if (!this.filler) {
      console.warn('FillerPartsComponent: No filler data provided.');
      return;
    }

    // Ensure we have numbers to display, even if they are 0
    const count = this.filler.count ?? 0;
    const qreject = this.filler.qreject ?? 0;
    
    console.log('Rendering Chart with:', { count, qreject });

    this.chartOptions = {
      series: [
        {
          name: 'Good Parts',
          data: [count],
        },
        {
          name: 'Reject Parts',
          data: [qreject],
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

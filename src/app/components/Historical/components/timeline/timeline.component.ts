import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { TimelineChartModel } from 'src/app/core/chartModel/apex';
import { HistoricalDashboardService } from '../../services/historical-dashboard.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: string;
    to?: string;
  };
  TimeLineChartOptionsL: any = {};
  loading: boolean = true;
  test: any[] = [];
  constructor(
    private _historicalDashboardService: HistoricalDashboardService,
    private _cdr: ChangeDetectorRef
  ) {}

  TimeLineRefactor() {
    this.loading = true;
    this._historicalDashboardService
      .TimeLineRefactor(
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj.to
      )
      .subscribe((data) => {
        this.test = data.map((x) => {
          return {
            name: x.name,
            data: [
              {
                x: x.testdata.map((x) => x.x)[0],
                y: x.testdata.map((z) =>
                  z.y.map(
                    (z) =>
                      new Date(z).getTime() +
                      new Date().getTimezoneOffset() * -60 * 1000
                  )
                )[0],
                fillColor: x.testdata.map((z) => z.fillColor)[0],
              },
            ],
          };
        });
        this.TimeLineChartOptionsL = TimelineChartModel({
          series: this.test,
        });
        this.loading = false;
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    this._cdr.detectChanges();
    this.TimeLineRefactor();
  }

  ngOnInit(): void {
    this.TimeLineRefactor();
  }

  ngAfterViewInit(): void {
    // this._cdr.detectChanges();
  }
}

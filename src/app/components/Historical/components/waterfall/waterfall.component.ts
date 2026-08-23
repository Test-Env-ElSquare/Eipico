import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { radialBarChartFunc } from 'src/app/core/chartModel/apex';
import { fillers } from '../../models/model';
import { HistoricalDashboardService } from '../../services/historical-dashboard.service';

@Component({
  selector: 'app-waterfall',
  templateUrl: './waterfall.component.html',
  styleUrls: ['./waterfall.component.scss'],
})
export class WaterfallComponent implements OnInit, OnChanges, AfterViewInit {
  barChartOptions: any = {};
  radialChartOptions: any = {};
  radialChartOptions1: any = {};
  radialChartOptions2: any = {};
  radialChartOptions3: any = {};
  @Input() filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  };
  loading: boolean = true;
  filler: fillers | null = null;
  constructor(
    private _historicalDashboardService: HistoricalDashboardService,
    private _cdr: ChangeDetectorRef,
  ) {}

  getFillerRefactor() {
    this.loading = true;
    this._historicalDashboardService
      .getFillerRefactor(
        this.filterObj?.selectedFactory,
        this.filterObj?.selectedLine,
        this.filterObj?.shiftFilterid,
        this.filterObj.from,
        this.filterObj.to,
      )
      .subscribe((data) => {
        this.filler = data[0]?.filerreads;
        this.radialChartOptions = radialBarChartFunc({
          name: 'OEE',
          series: [(this.filler?.oee! * 100)?.toFixed(0)],
          symbole: ' % ',
          color: '#2563EB',
          height: 230,
        });
        this.radialChartOptions2 = radialBarChartFunc({
          name: 'Quality',
          series: [(this.filler?.quality! * 100)?.toFixed(0)],
          symbole: ' % ',
          color: '#16A34A',
          height: 230,
        });
        this.radialChartOptions1 = radialBarChartFunc({
          name: 'Performance',
          series: [(this.filler?.performance! * 100)?.toFixed(0)],
          symbole: ' % ',
          color: '#F59E0B',
          height: 230,
        });
        this.radialChartOptions3 = radialBarChartFunc({
          name: 'Availability',
          series: [(this.filler?.availability! * 100)?.toFixed(0)],
          symbole: ' % ',
          color: '#8B5CF6',
          height: 230,
        });
        this.loading = false;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this._cdr.detectChanges();
    this.getFillerRefactor();
  }

  ngOnInit(): void {
    //drew charts
    // this.getFillerRefactor();
  }
  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }
}

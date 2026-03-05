import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { GetFillerRefactor } from '../../models/model';
import { HistoricalDashboardService } from '../../services/historical-dashboard.service';

type DataMode = 'READS' | 'HOUR' | 'DAY' | 'ALL' | 'NONE';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() filterObj!: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  };

  filler!: GetFillerRefactor | null;
  loading: boolean = false;
  dataMode: DataMode = 'NONE';

  constructor(
    private _historicalService: HistoricalDashboardService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFillerRefactor();
  }

  ngOnChanges(): void {
    this.getFillerRefactor();
  }

  getFillerRefactor(): void {
    if (!this.filterObj) return;

    this.loading = true;
    this._historicalService
      .getFillerRefactor(
        this.filterObj.selectedFactory,
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj?.to
      )
      .subscribe({
        next: (data) => {
          this.filler = data[0] || null;
          this.detectDataMode();
          this.loading = false;
          this._cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.filler = null;
          this.dataMode = 'NONE';
        },
      });
  }

  private detectDataMode(): void {
    if (!this.filler) {
      this.dataMode = 'NONE';
      return;
    }

    const hasReads = !!this.filler.filerreads;
    const hasHour =
      Array.isArray(this.filler.filler_per_Hour) &&
      this.filler.filler_per_Hour.length > 0;
    const hasDay =
      Array.isArray(this.filler.filerperday) &&
      this.filler.filerperday.length > 0;

    if (hasReads && hasHour && hasDay) {
      this.dataMode = 'ALL';
    } else if (hasHour) {
      this.dataMode = 'HOUR';
    } else if (hasDay) {
      this.dataMode = 'DAY';
    } else if (hasReads) {
      this.dataMode = 'READS';
    } else {
      this.dataMode = 'NONE';
    }
  }
}

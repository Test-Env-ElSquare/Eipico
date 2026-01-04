import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { GetFillerRefactor } from '../../models/model';
import { HistoricalDashboardService } from '../../services/historical-dashboard.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  };
  duration: number;
  filler: GetFillerRefactor | any;
  loading: boolean = false;

  constructor(
    private _historicalService: HistoricalDashboardService,
    private _cdr: ChangeDetectorRef
  ) {}

  getFillerRefactor() {
    this.loading = true;
    this._historicalService
      .getFillerRefactor(
        this.filterObj.selectedFactory,
        this.filterObj.selectedLine,
        this.filterObj.shiftFilterid,
        this.filterObj.from,
        this.filterObj?.to
      )
      .subscribe((data) => {
        this.filler = data[0];
        this.loading = false;
      });
  }

  ngOnChanges() {
    this._cdr.detectChanges();
    this.getFillerRefactor();
  }
  ngOnInit(): void {
    this.getFillerRefactor();
  }
  ngAfterViewInit(): void {
    // this._cdr.detectChanges();
  }
}

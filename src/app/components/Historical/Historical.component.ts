import { Component, OnInit } from '@angular/core';
import { Historical } from './models/model';

@Component({
  selector: 'app-Historical',
  templateUrl: './Historical.component.html',
  styleUrls: ['./Historical.component.scss'],
})
export class HistoricalComponent implements OnInit {
  dashboardData: Historical;
  part: number | boolean;

  durations: number;
  filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: string;
    to?: string;
  };

  constructor() {}
  //take the emitted value from child
  getFilterValues(data: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: string | '';
    to?: string | '';
  }) {
    this.filterObj = data;
  }

  parts(data: number | boolean) {
    return (this.part = data);
  }

  duration(event: number) {
    this.durations = event;
  }

  ngOnInit() {}
}

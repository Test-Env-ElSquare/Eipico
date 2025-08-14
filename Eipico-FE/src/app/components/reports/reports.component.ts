import { Component, OnInit } from '@angular/core';
import { ReportsService } from './services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private _reportService :ReportsService) { }

  ngOnInit(): void {
  }
  HistoricalDashobardsPerHour(){
    //this._reportService.HistoricalDashobardsPerHour().subscribe{

   // }
  }

}

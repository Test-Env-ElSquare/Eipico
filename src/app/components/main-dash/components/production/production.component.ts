import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getRadarChartOptions } from 'src/app/core/chartModel/apex';
import { DrilDownChartModelRefactor } from 'src/app/core/chartModel/HChart';
import { MainDashboardService } from '../../services/main-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { factoryProduction } from '../../models/model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionComponent implements OnInit {
  DrilDownChart: string = 'DrilDownChart';
  RadarChartOptions: any;
  duration: number;
  shiftFilterid: number = 0;
  totalEnergy: number;
  numOfPartsandtotalEnergy: factoryProduction[];
  @Output() EUR = new EventEmitter<factoryProduction[]>();
  constructor(
    private _mainDashboard: MainDashboardService,
    private _toastr: ToastrService
  ) {}
  //get GetMainDashobard by time
  GetMainDashobard(duration: number) {
    this.shiftFilterid = duration;

    this._mainDashboard.GetMainDashobard(duration).subscribe((res) => {
      this.numOfPartsandtotalEnergy = res[0].factoryProduction;
    });
  }

  //get GetOEEDashobard last 7 days
  GetOEEDashobard() {
    this._mainDashboard.GetOEEDashobard().subscribe((res) => {
      this.RadarChartOptions = getRadarChartOptions({
        sleSeries: res[0].oee,
        timeSeries: res[0].days.map((x) => new Date(x).toLocaleDateString()),
      });
    });
  }


  ngOnInit(): void {
    this.GetMainDashobard(0);
    this.GetOEEDashobard();
  }
}

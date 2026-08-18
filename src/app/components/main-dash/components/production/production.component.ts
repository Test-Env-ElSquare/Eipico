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
  isLoadingMain = true;
  isLoadingOEE = true;
  mainError = false;
  oeeError = false;
  oeeLatest: number = 0;
  oeeAverage: number = 0;
  oeeTrend: number = 0;
  @Output() EUR = new EventEmitter<factoryProduction[]>();
  constructor(
    private _mainDashboard: MainDashboardService,
    private _toastr: ToastrService
  ) {}
  //get GetMainDashobard by time
  GetMainDashobard(duration: number) {
    this.shiftFilterid = duration;
    this.isLoadingMain = true;
    this.mainError = false;

    this._mainDashboard.GetMainDashobard(duration).subscribe({
      next: (res) => {
        this.totalEnergy = res[0].factoryProduction[0].toalenergy;
        this.numOfPartsandtotalEnergy = res[0].factoryProduction;
        DrilDownChartModelRefactor({
          id: this.DrilDownChart,
          factory: res[0].factoryProduction,
          line: res[0].lineProduction,
          Name: 'Parts',
        });
        this.EUR.emit(res[0].factoryProduction);
        this.isLoadingMain = false;
      },
      error: () => {
        this.isLoadingMain = false;
        this.mainError = true;
      },
    });
  }

  //get GetOEEDashobard last 7 days
  GetOEEDashobard() {
    this.isLoadingOEE = true;
    this.oeeError = false;
    this._mainDashboard.GetOEEDashobard().subscribe({
      next: (res) => {
        const oeeSeries = res[0].oee || [];
        this.RadarChartOptions = getRadarChartOptions({
          sleSeries: oeeSeries,
          timeSeries: res[0].days.map((x) => new Date(x).toLocaleDateString()),
        });
        this.oeeLatest = oeeSeries.length ? oeeSeries[oeeSeries.length - 1] : 0;
        this.oeeAverage = oeeSeries.length
          ? oeeSeries.reduce((sum, val) => sum + val, 0) / oeeSeries.length
          : 0;
        this.oeeTrend = oeeSeries.length > 1
          ? this.oeeLatest - oeeSeries[oeeSeries.length - 2]
          : 0;
        this.isLoadingOEE = false;
      },
      error: () => {
        this.isLoadingOEE = false;
        this.oeeError = true;
      },
    });
  }

  // Readable OEE benchmark label so the radar shape isn't the only way to
  // judge performance (industry-standard OEE bands).
  get oeeStatus(): { label: string; className: string } {
    if (this.oeeLatest >= 85) return { label: 'World Class', className: 'text-success' };
    if (this.oeeLatest >= 60) return { label: 'Good', className: 'text-success' };
    if (this.oeeLatest >= 40) return { label: 'Fair', className: 'text-warning' };
    return { label: 'Needs Attention', className: 'text-danger' };
  }

  ngOnInit(): void {
    this.GetMainDashobard(0);
    this.GetOEEDashobard();
  }
}

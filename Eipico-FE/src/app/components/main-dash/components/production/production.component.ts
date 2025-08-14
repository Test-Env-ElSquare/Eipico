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
  shiftFilterid: number = 2;
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
      this.totalEnergy = res[0].factoryProduction[0].toalenergy;
      this.numOfPartsandtotalEnergy = res[0].factoryProduction;
      DrilDownChartModelRefactor({
        id: this.DrilDownChart,
        factory: res[0].factoryProduction,
        line: res[0].lineProduction,
        Name: 'Parts',
      });
      this.EUR.emit(res[0].factoryProduction);
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

  // generatePDF() {
  //   const doc = new jsPDF();

  //   // Optional: Set the page size (e.g., A4)
  //   doc.setProperties({
  //     title: 'Dashboard Report',
  //     subject: 'Generated PDF for Dashboard',
  //     author: 'Your Company',
  //   });

  //   // Set title for the PDF
  //   doc.setFontSize(18);
  //   doc.text('Dashboard Report', 20, 20);

  //   const chartElement = document.getElementById('pdf-content'); // Change to your chart container ID

  //   if (chartElement) {
  //     html2canvas(chartElement).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       doc.addImage(imgData, 'PNG', 10, 30, 180, 100);

  //       // Add other content to the PDF (e.g., text, tables, etc.)
  //       doc.text('Other content goes here...', 20, 140);

  //       // Save the PDF
  //       doc.save('dashboard-report.pdf');
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.GetMainDashobard(2);
    this.GetOEEDashobard();
  }
}

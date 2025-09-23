import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyReportsComponent } from './components/daily-reports/daily-reports.component';
import { BeconReportComponent } from './components/becon-report/becon-report.component';
import { EnergyReportComponent } from './components/energy-report/energy-report.component';

const routes: Routes = [
  { path: 'dailyReports', component: DailyReportsComponent },
  { path: 'beconReports', component: BeconReportComponent },
  { path: 'energyReports', component: EnergyReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}

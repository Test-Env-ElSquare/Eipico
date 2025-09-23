import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { DailyReportsComponent } from './components/daily-reports/daily-reports.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BeconReportComponent } from './components/becon-report/becon-report.component';
import { MatIconModule } from '@angular/material/icon';
import { EnergyReportComponent } from './components/energy-report/energy-report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'primeng/table';
import { share } from 'rxjs';
import { SharedModule } from 'src/app/views/shared/shared.module';

@NgModule({
  declarations: [
    ReportsComponent,
    DailyReportsComponent,
    BeconReportComponent,
    EnergyReportComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxPaginationModule,
    TableModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class ReportsModule {}

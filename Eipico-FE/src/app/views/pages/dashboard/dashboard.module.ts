import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule,NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from './dashboard.component';
import { HighlightModule } from 'ngx-highlightjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastModule } from 'primeng/toast';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { DashBoardDetailsComponent } from './DashBoard-details/DashBoard-details.component';
import * as moment from 'moment';
const routes: Routes = [
  {
    path: '',
    component: DashBoardDetailsComponent
  },
  {
    path: 'Dashboard',
    component: DashBoardDetailsComponent
  },

]

@NgModule({
  declarations: [DashboardComponent,DashBoardDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgbTimepickerModule,
    HighlightModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule, // Ng-select
    ToastModule,
    SweetAlert2Module


  ]
})
export class DashboardModule { }



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

import { DashboardModelComponent } from './DashboardModel.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighlightModule } from 'ngx-highlightjs';
import { ToastModule } from 'primeng/toast';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [
  {
    path: '',
    component: DashboardModelComponent
  }
]

@NgModule({
  declarations: [DashboardModelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
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
    SweetAlert2Module.forRoot(),

  ]
})
export class DashboardModelModule { }

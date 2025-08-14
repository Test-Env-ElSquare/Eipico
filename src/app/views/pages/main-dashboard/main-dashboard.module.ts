import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { MainDashboardComponent } from './main-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule, NgbTimepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HighlightModule } from 'ngx-highlightjs';
import { ToastModule } from 'primeng/toast';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    MainDashboardRoutingModule,
    CommonModule,
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
    SweetAlert2Module.forRoot(),
  ]
})
export class MainDashboardModule { }

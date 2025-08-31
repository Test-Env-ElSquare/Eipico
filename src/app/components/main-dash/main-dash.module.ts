import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainDashRoutingModule } from './main-dash-routing.module';
import { MainDashComponent } from './main-dash.component';
import { ConsumptionComponent } from './components/consumption/consumption.component';
import { ProductionComponent } from './components/production/production.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NumberOfPartsComponent } from './components/production/number-of-parts/number-of-parts.component';
import { EnergyConsumptionComponent } from './components/production/energy-consumption/energy-consumption.component';
import { EURComponent } from './components/production/eur/eur.component';
import { OeeDashboardComponent } from './components/production/oee-dashboard/oee-dashboard.component';
import { SkeletonModule } from 'primeng/skeleton';



@NgModule({
  declarations: [
    MainDashComponent,
    ConsumptionComponent,
    ProductionComponent,
    NumberOfPartsComponent,
    EnergyConsumptionComponent,
    EURComponent,
    OeeDashboardComponent
  ],
  imports: [
    CommonModule,
    MainDashRoutingModule,
    NgApexchartsModule,
    NgbDropdownModule,
    FormsModule,
    ToastrModule.forRoot(),
    SkeletonModule
  ]
})
export class MainDashModule { }

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



@NgModule({
  declarations: [
    MainDashComponent,
    ConsumptionComponent,
    ProductionComponent
  ],
  imports: [
    CommonModule,
    MainDashRoutingModule,
    NgApexchartsModule,
    NgbDropdownModule,
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class MainDashModule { }

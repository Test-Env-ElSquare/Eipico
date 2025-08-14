import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ScadaRoutingModule } from './scada-routing.module';
import { ScadaComponent } from './scada.component';
import { MainScadaComponent } from './components/main-scada/main-scada.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    ScadaComponent,
    MainScadaComponent
  ],
  imports: [
    CommonModule,
    ScadaRoutingModule,
    NgbModule,
    NgSelectModule,
     ReactiveFormsModule,
     NgApexchartsModule
  ]
})
export class ScadaModule { }

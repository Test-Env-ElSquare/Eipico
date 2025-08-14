import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { MaterialControlComponent } from './component/material-control/material-control.component';
import { MaterialConsumptionComponent } from './component/material-consumption/material-consumption.component';
import { MaterialFlowComponent } from './component/material-flow/material-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { SearchPipe } from './material.pipe';


@NgModule({
  declarations: [
    MaterialComponent,
    MaterialFlowComponent,
    MaterialControlComponent,
    MaterialConsumptionComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FeatherIconModule,
    FormsModule
  ]
})
export class MaterialModule { }

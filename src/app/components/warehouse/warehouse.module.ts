import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    NgSelectModule,
    FormsModule
  ]
})
export class WarehouseModule { }

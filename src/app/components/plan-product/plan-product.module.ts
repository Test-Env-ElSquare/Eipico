import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plan-product-routing.module';
import { PlansComponent } from './plan-product.component';
import { AddComponent } from './components/add/add.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PlansComponent, AddComponent, DataTableComponent],
  imports: [
    CommonModule,
    PlansRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    NgxPaginationModule,
  ],
})
export class PlansModule {}

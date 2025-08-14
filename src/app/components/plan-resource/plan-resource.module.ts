import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanResourceRoutingModule } from './plan-resource-routing.module';
import { PlanResourceComponent } from './plan-resource.component';
import { AddComponent } from './components/add/add.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PlanResourceComponent, AddComponent, DataTableComponent],
  imports: [
    CommonModule,
    PlanResourceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    NgxPaginationModule,
  ],
})
export class PlanResourceModule {}

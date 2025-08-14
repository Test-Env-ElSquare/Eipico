import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanComponent } from './plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbCollapseModule, NgbDatepickerModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ResourceComponent } from './resource/resource.component';
import { ProductComponent } from './product/product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ResourceComponent },{ path: 'Product', component: ProductComponent }];

@NgModule({
  declarations: [
    PlanComponent,
    ResourceComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapseModule,
    PerfectScrollbarModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    ReactiveFormsModule ,
    NgbModule,
    NgbTimepickerModule,
    NgSelectModule,
    RouterModule.forChild(routes),

  ]
})
export class PlanModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalComponent } from './Historical.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { WaterfallComponent } from './components/waterfall/waterfall.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TotalProductionComponent } from './components/total-production/total-production.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from 'src/app/views/layout/loader/loader.component';
import { TableComponent } from './components/table/table.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FillerPartsComponent } from './components/total-production/filler-parts/filler-parts.component';
import { SkeletonModule } from 'primeng/skeleton';
import { FillerSpeedComponent } from './components/total-production/filler-speed/filler-speed.component';
import { EnergyComponent } from './components/total-production/energy/energy.component';

const routes: Routes = [
  {
    path: '',
    component: HistoricalComponent
  },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgApexchartsModule,
    NgbModule,
    NgSelectModule, // Ng-select
    ToastModule,
    SweetAlert2Module.forRoot(),
    MatProgressSpinnerModule,
    SkeletonModule
  ],
  declarations: [HistoricalComponent, FilterComponent, WaterfallComponent, TimelineComponent, TotalProductionComponent,LoaderComponent, TableComponent, FillerPartsComponent, FillerSpeedComponent, EnergyComponent]
})
export class HistoricalModule { }

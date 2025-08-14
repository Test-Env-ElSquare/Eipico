import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineRoutingModule } from './machine-routing.module';
import { MachineStatusComponent } from './machine-status/machine-status.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ExploreComponent } from './explore/explore.component';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { SidebarModule } from 'primeng/sidebar';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    MachineStatusComponent,
    IndicatorsComponent,
    ExploreComponent
  ],
  imports: [
    CommonModule,
    MachineRoutingModule,
    NgApexchartsModule,
    FeatherIconModule,
    SidebarModule,
    NgbModule,
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    HttpClientModule,
    NgSelectModule, // Ng-select
    ToastModule,
    // NgxEchartsModule.forRoot({
    //   /**
    //    * This will import all modules from echarts.
    //    * If you only need custom modules,
    //    * please refer to [Custom Build] section.
    //    */
    //   echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    // }),
  ]
})
export class MachineModule { }

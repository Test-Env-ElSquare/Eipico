import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './Tree.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FactoryViewComponent } from './Factory-view/Factory-view.component';
import { LineViewComponent } from './line-view/line-view.component';
import { LineDetailsComponent } from './line-details/line-details.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule, NgbDatepickerModule, NgbTimepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HighlightModule } from 'ngx-highlightjs';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const routes: Routes = [
  {
    path: '',
    component: TreeComponent,
    children: [
      {
        path: '',
        redirectTo: 'Factory-view',
        pathMatch: 'full'
      },
      {
        path: 'Factory-view',
        component: FactoryViewComponent
      },
      {
        path: 'Line-view/:FName',
        component: LineViewComponent
      },
      {
        path: 'Line-Details/:FName/:line',
        component: LineDetailsComponent
      }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgbTimepickerModule,
    HighlightModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule,
    MatProgressBarModule, // Ng-select

  ],
  declarations: [TreeComponent,FactoryViewComponent,LineViewComponent,LineDetailsComponent]
})
export class TreeModule { }

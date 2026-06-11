import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExternalDashboardComponent } from './external-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalDashboardRoutingModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExternalDashboardRoutingModule } from './external-dashboard-routing.module';
import { ExternalDashboardComponent } from './external-dashboard.component';

@NgModule({
  declarations: [ExternalDashboardComponent],
  imports: [CommonModule, ExternalDashboardRoutingModule],
})
export class ExternalDashboardModule {}

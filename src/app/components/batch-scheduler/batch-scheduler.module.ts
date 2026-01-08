import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchSchedulerRoutingModule } from './batch-scheduler-routing.module';
import { BatchSchedulerComponent } from './batch-scheduler.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [BatchSchedulerComponent],
  imports: [
    CommonModule,
    BatchSchedulerRoutingModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    NgbModule,
    NgSelectModule, // Ng-select
    ToastModule,
    SweetAlert2Module.forRoot(),
  ],
})
export class BatchSchedulerModule {}

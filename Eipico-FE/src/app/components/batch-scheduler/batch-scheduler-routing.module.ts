import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchSchedulerComponent } from './batch-scheduler.component';

const routes: Routes = [{ path: '', component: BatchSchedulerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchSchedulerRoutingModule { }

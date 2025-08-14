import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './components/all/all.component';
import { BatchHistoryComponent } from './components/batch-history/batch-history.component';
import { BatchWeightComponent } from './components/batch-weight/batch-weight.component';

const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'History', component: BatchHistoryComponent },
  { path: 'batchWeight', component: BatchWeightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchSettingRoutingModule {}

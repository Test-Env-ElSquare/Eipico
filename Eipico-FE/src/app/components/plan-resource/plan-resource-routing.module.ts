import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanResourceComponent } from './plan-resource.component';

const routes: Routes = [
  { path: '', component: PlanResourceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanResourceRoutingModule { }

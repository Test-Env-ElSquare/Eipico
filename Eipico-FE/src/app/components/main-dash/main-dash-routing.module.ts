import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashComponent } from './main-dash.component';

const routes: Routes = [
  { path: '', component: MainDashComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDashRoutingModule { }

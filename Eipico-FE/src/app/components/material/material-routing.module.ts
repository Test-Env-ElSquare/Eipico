import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { MaterialFlowComponent } from './component/material-flow/material-flow.component';
import { MaterialControlComponent } from './component/material-control/material-control.component';
import { MaterialConsumptionComponent } from './component/material-consumption/material-consumption.component';

const routes: Routes = [
  {path:'materialFlow',component:MaterialFlowComponent},
  {path:'materialControl',component:MaterialControlComponent},
  {path:'materialConsumption',component:MaterialConsumptionComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }

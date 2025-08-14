import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { MachineStatusComponent } from './machine-status/machine-status.component';

const routes: Routes = [

  { path: '', component: MachineStatusComponent },
  { path: 'indicators', component: IndicatorsComponent },
  { path: 'explore', component: ExploreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineRoutingModule { }

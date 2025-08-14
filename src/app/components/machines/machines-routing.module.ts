import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineStateComponent } from './components/machine-state/machine-state.component';
import { LineMachineComponent } from './components/line-machine/line-machine.component';

const routes: Routes = [
  {path:'machineState',component:MachineStateComponent},
  {path:'lineMachine',component:LineMachineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinesRoutingModule { }

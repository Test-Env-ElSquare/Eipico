import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachinesRoutingModule } from './machines-routing.module';
import { MachineStateComponent } from './components/machine-state/machine-state.component';
import { LineMachineComponent } from './components/line-machine/line-machine.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [MachineStateComponent, LineMachineComponent],
  imports: [CommonModule, MachinesRoutingModule,ReactiveFormsModule,NgSelectModule],
})
export class MachinesModule {}

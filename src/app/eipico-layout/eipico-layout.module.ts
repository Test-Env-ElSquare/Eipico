import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EipicoLayoutRoutingModule } from './eipico-layout-routing.module';
import { EipicoLayoutOneComponent } from './components/eipico-layout-one/eipico-layout-one.component';
import { EipicoLayoutTwoComponent } from './components/eipico-layout-two/eipico-layout-two.component';
import { MachineDetailsComponent } from './components/machine-details/machine-details.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    EipicoLayoutOneComponent,
    EipicoLayoutTwoComponent,
    MachineDetailsComponent,
  ],
  imports: [
    CommonModule,
    EipicoLayoutRoutingModule,
    RouterModule,
    DialogModule,
  ],
})
export class EipicoLayoutModule {}

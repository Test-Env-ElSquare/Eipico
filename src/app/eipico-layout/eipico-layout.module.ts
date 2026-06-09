import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EipicoLayoutRoutingModule } from './eipico-layout-routing.module';
import { EipicoLayoutOneComponent } from './components/eipico-layout-one/eipico-layout-one.component';
import { EipicoLayoutTwoComponent } from './components/eipico-layout-two/eipico-layout-two.component';
import { MachineDetailsComponent } from './components/machine-details/machine-details.component';
import { DialogModule } from 'primeng/dialog';
import { LayoutOneCopyComponent } from './components/layout-one-copy/layout-one-copy.component';
import { MachineCopyDetailsComponent } from './components/machine-details/machine-copy-details/machine-copy-details.component';
import { LayoutTwoCopyComponent } from './components/layout-two-copy/layout-two-copy.component';
import { MachineStateDetailsComponent } from './components/machine-state-details/machine-state-details.component';
import { EipicoOneLayoutOneComponent } from './components/eipico-fullscreen-layouts/eipico-one-layout-one.component';
import { EipicoOneLayoutTwoComponent } from './components/eipico-fullscreen-layouts/eipico-one-layout-two.component';
import { EipicoTwoFullscreenComponent } from './components/eipico-fullscreen-layouts/eipico-two-fullscreen.component';
@NgModule({
  declarations: [
    EipicoLayoutOneComponent,
    EipicoLayoutTwoComponent,
    MachineDetailsComponent,
    LayoutOneCopyComponent,
    MachineCopyDetailsComponent,
    LayoutTwoCopyComponent,
    MachineStateDetailsComponent,
    EipicoOneLayoutOneComponent,
    EipicoOneLayoutTwoComponent,
    EipicoTwoFullscreenComponent,
  ],
  imports: [
    CommonModule,
    EipicoLayoutRoutingModule,
    RouterModule,
    DialogModule,
  ],
})
export class EipicoLayoutModule {}

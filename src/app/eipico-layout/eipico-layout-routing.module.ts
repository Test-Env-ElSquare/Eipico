import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EipicoLayoutOneComponent } from './components/eipico-layout-one/eipico-layout-one.component';
import { EipicoLayoutTwoComponent } from './components/eipico-layout-two/eipico-layout-two.component';
import { MachineDetailsComponent } from './components/machine-details/machine-details.component';
import { LayoutOneCopyComponent } from './components/layout-one-copy/layout-one-copy.component';
import { LayoutTwoCopyComponent } from './components/layout-two-copy/layout-two-copy.component';
const routes: Routes = [
  { path: 'eipico-one', component: EipicoLayoutOneComponent },
  { path: 'eipico-two', component: EipicoLayoutTwoComponent },
  { path: 'layout-one-copy', component: LayoutOneCopyComponent },
  { path: 'layout-two', component: LayoutTwoCopyComponent },
  { path: 'machine-details', component: MachineDetailsComponent },
  { path: 'machine-details-copy', component: MachineDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EipicoLayoutRoutingModule {}

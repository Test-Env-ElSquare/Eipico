import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EipicoLayoutOneComponent } from './components/eipico-layout-one/eipico-layout-one.component';
import { EipicoLayoutTwoComponent } from './components/eipico-layout-two/eipico-layout-two.component';

const routes: Routes = [
  { path: 'eipico-one', component: EipicoLayoutOneComponent },
  { path: 'eipico-two', component: EipicoLayoutTwoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EipicoLayoutRoutingModule {}

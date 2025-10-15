import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EipicoLayoutRoutingModule } from './eipico-layout-routing.module';
import { EipicoLayoutOneComponent } from './components/eipico-layout-one/eipico-layout-one.component';
import { EipicoLayoutTwoComponent } from './components/eipico-layout-two/eipico-layout-two.component';


@NgModule({
  declarations: [
    EipicoLayoutOneComponent,
    EipicoLayoutTwoComponent
  ],
  imports: [
    CommonModule,
    EipicoLayoutRoutingModule
  ]
})
export class EipicoLayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlarmsRoutingModule } from './alarms-routing.module';
import { AlarmsComponent } from './alarms.component';


@NgModule({
  declarations: [
    AlarmsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlarmsRoutingModule
  ]
})
export class AlarmsModule { }

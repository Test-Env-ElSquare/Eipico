import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SettingsComponent,

  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherIconModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbModule,

  ]
})
export class SettingsModule { }

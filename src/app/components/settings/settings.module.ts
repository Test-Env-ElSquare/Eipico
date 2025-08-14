import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { MachineSettingsComponent } from './components/machine-settings/machine-settings.component';
import { FactorySettingsComponent } from './components/factory-settings/factory-settings.component';
import { ProductionSettingsComponent } from './components/production-settings/production-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LineSettingsComponent } from './components/line-settings/line-settings.component';
// import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ShiftComponent } from './components/shift/shift.component';

import { CalendarModule } from 'primeng/calendar';
import {
  NgbDropdownModule,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    MachineSettingsComponent,
    FactorySettingsComponent,
    ProductionSettingsComponent,
    LineSettingsComponent,
    UserManagementComponent,
    AddRoleComponent,
    ShiftComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    InputTextModule,
    NgSelectModule,
    MultiSelectModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbCollapseModule,
    NgbTimepickerModule,
    DropdownModule,
    CalendarModule,
    // FeatherIconModule,
  ],
})
export class SettingsModule {}

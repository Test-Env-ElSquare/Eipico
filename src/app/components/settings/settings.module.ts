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
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import {
  NgbDropdownModule,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { AuthModule } from 'src/app/views/pages/auth/auth.module';
import { EditRoleComponent } from './components/edit-role/edit-role.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MachineSettingsComponent,
    FactorySettingsComponent,
    ProductionSettingsComponent,
    LineSettingsComponent,
    UserManagementComponent,
    AddRoleComponent,
    ShiftComponent,
    EditRoleComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    DialogModule,
    ButtonModule,
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
    SharedModule,
    DialogModule,
    AuthModule,
    // FeatherIconModule,
  ],
})
export class SettingsModule {}

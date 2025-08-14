import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactorySettingsComponent } from './components/factory-settings/factory-settings.component';
import { MachineSettingsComponent } from './components/machine-settings/machine-settings.component';
import { ProductionSettingsComponent } from './components/production-settings/production-settings.component';
import { LineSettingsComponent } from './components/line-settings/line-settings.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { ShiftComponent } from './components/shift/shift.component';

const routes: Routes = [
  { path: 'factory-settings', component: FactorySettingsComponent },
  { path: 'machine-settings', component: MachineSettingsComponent },
  { path: 'production-settings', component: ProductionSettingsComponent },
  { path: 'line-settings', component: LineSettingsComponent },
  { path: 'addRole', component: AddRoleComponent },
  { path: 'userMangement', component: UserManagementComponent },
  { path: 'shift', component: ShiftComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}

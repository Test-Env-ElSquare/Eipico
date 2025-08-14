import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {
  roleName: string;
  selectedClaims: any;
  claimsList: any;

  constructor(
    private userManagementService: UserManagementService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.claimsList = [
      { type: 'HasAccessToE1', value: 'true' },
      { type: 'HasAccessToE2', value: 'true' },
      { type: 'HasAccessToMainDashboards', value: 'true' },
      { type: 'HasAccessToHistoricalDashboards', value: 'true' },
      { type: 'HasAccessToProductionPlan', value: 'true' },
      { type: 'HasAccessToProductionPlanAndAdd', value: 'true' },
      { type: 'HasAccessToProductionPlanAndEdit', value: 'true' },
      { type: 'HasAccessToProductionPlanAndDelete', value: 'true' },
      { type: 'HasAccessToMachineStatus', value: 'true' },
      { type: 'HasAccessToLineMachine', value: 'true' },
      { type: 'HasAccessToEnergyReport', value: 'true' },
      { type: 'HasAccessToBeconReport', value: 'true' },

      { type: 'HasAccessToBatchSettings', value: 'true' },
      { type: 'HasAccessToBatchSettingsAndPrint', value: 'true' },
      { type: 'HasAccessToBatchSettingsAndDelete', value: 'true' },

      { type: 'HasAccessToBatchWeight', value: 'true' },
      { type: 'HasAccessToBatchHistory', value: 'true' },

      { type: 'HasAccessToBatchSchedulerView', value: 'true' },
      { type: 'HasAccessToBatchSchedulerViewAndActivate', value: 'true' },
      { type: 'HasAccessToBatchSchedulerViewAndFinish', value: 'true' },

      { type: 'HasAccessToScaleHistory', value: 'true' },
      { type: 'HasAccessToMaterialControl', value: 'true' },
      { type: 'HasAccessToAddMaterial', value: 'true' },
      { type: 'HasAccessToEditMaterial', value: 'true' },
      { type: 'HasAccessToDeleteMaterial', value: 'true' },
      { type: 'HasAccessToStoppagePlan', value: 'true' },
      { type: 'HasAccessToLineSettings', value: 'true' },
      { type: 'HasAccessToscada', value: 'true' },
      { type: 'HasAccessToProductionSettings', value: 'true' },
      { type: 'HasAccessToAddRole', value: 'true' },
      { type: 'HasAccessToUserManagement', value: 'true' },
    ];
  }

  addRole() {
    this.userManagementService
      .addRole(this.roleName, this.selectedClaims)
      .subscribe({
        next: (data) => {
          this.toastr.success(data.message);
          this.roleName = '';
          this.selectedClaims = [];
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
}

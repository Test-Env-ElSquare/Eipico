import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app-Service.service';
import { IArea, Iclamis, IRole } from 'src/app/views/pages/auth/models/auth';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {
  roleName: string;

  selectedClaims: any;
  filteredClaims: any;
  claimsList: Iclamis[];
  allRolesDetails: any;
  allRoles: IRole[] = [];
  selectedRole: string | undefined = undefined;
  selectedAreas: number[];
  allAreas: IArea[] = [];

  constructor(
    private userManagementService: UserManagementService,
    private toastr: ToastrService,
    private _appService: AppService
  ) {}

  ngOnInit(): void {
    this.onGetAllCalims();
    this.onGetAllRoles();
    this.getRoles();
    this.onGetAreas();
    // this.claimsList = [
    //   { type: 'HasAccessToE1', value: 'true' },
    //   { type: 'HasAccessToE2', value: 'true' },
    //   { type: 'HasAccessToMainDashboards', value: 'true' },
    //   { type: 'HasAccessToHistoricalDashboards', value: 'true' },
    //   { type: 'HasAccessToProductionPlan', value: 'true' },
    //   { type: 'HasAccessToProductionPlanAndAdd', value: 'true' },
    //   { type: 'HasAccessToProductionPlanAndEdit', value: 'true' },
    //   { type: 'HasAccessToProductionPlanAndDelete', value: 'true' },
    //   { type: 'HasAccessToMachineStatus', value: 'true' },
    //   { type: 'HasAccessToLineMachine', value: 'true' },
    //   { type: 'HasAccessToEnergyReport', value: 'true' },
    //   { type: 'HasAccessToBeconReport', value: 'true' },
    //   { type: 'HasAccessToBatchSettings', value: 'true' },
    //   { type: 'HasAccessToBatchSettingsAndPrint', value: 'true' },
    //   { type: 'HasAccessToBatchSettingsAndDelete', value: 'true' },
    //   { type: 'HasAccessToBatchWeight', value: 'true' },
    //   { type: 'HasAccessToBatchHistory', value: 'true' },
    //   { type: 'HasAccessToBatchSchedulerView', value: 'true' },
    //   { type: 'HasAccessToBatchSchedulerViewAndActivate', value: 'true' },
    //   { type: 'HasAccessToBatchSchedulerViewAndFinish', value: 'true' },
    //   { type: 'HasAccessToScaleHistory', value: 'true' },
    //   { type: 'HasAccessToMaterialControl', value: 'true' },
    //   { type: 'HasAccessToAddMaterial', value: 'true' },
    //   { type: 'HasAccessToEditMaterial', value: 'true' },
    //   { type: 'HasAccessToDeleteMaterial', value: 'true' },
    //   { type: 'HasAccessToStoppagePlan', value: 'true' },
    //   { type: 'HasAccessToLineSettings', value: 'true' },
    //   { type: 'HasAccessToscada', value: 'true' },
    //   { type: 'HasAccessToProductionSettings', value: 'true' },
    //   { type: 'HasAccessToAddRole', value: 'true' },
    //   { type: 'HasAccessToUserManagement', value: 'true' },
    // ];
  }
  onGetAreas() {
    this._appService.getAllAreasAndRoles().subscribe({
      next: (res) => {
        this.allAreas = res.areas;
        console.log(this.allAreas);
      },
    });
  }
  getRoles() {
    this.userManagementService.getRoles().subscribe({
      next: (data: any) => {
        //All
        this.allRoles = [{ name: 'All' }, ...data];
        this.claimsList = [{ claimName: 'All' }, ...data];
      },
    });
  }

  onGetAllRoles(roleName?: string, claims?: string) {
    this.userManagementService.getRolesDetails(roleName, claims).subscribe({
      next: (res) => {
        this.allRolesDetails = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onRoleChange() {
    if (this.selectedRole === 'All') {
      // All
      this.onGetAllRoles();
    } else {
      this.onGetAllRoles(this.selectedRole || undefined);
    }
  }
  onClaimChange() {
    if (this.filteredClaims === 'All') {
      // All
      this.onGetAllRoles();
    } else {
      this.onGetAllRoles(this.filteredClaims || undefined);
    }
  }

  addRole() {
    console.log(this.selectedClaims);
    this.userManagementService
      .addRole(this.roleName, this.selectedClaims, this.selectedAreas)
      .subscribe({
        next: (data) => {
          this.toastr.success(data.message);
          this.roleName = '';
          this.selectedClaims = [];
          this.selectedAreas = [];
          this.onGetAllRoles();
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
      });
  }
  onGetAllCalims() {
    this._appService.getAllClaims().subscribe({
      next: (res) => {
        this.claimsList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

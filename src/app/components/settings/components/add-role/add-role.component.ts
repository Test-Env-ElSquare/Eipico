import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app-Service.service';
import { IArea, Iclamis, IRole } from 'src/app/views/pages/auth/models/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
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
  claims: any[] = [];
  allRolesDetails: any;
  originalRolesDetails: any[] = [];
  allRoles: IRole[] = [];
  selectedRole: string | undefined = undefined;
  selectedAreas: number[];
  allAreas: IArea[] = [];
  form: FormGroup;
  showDeleteDialog: boolean = false;
  selectedRoleName: string = '';
  visible: boolean = false;
  addForm!: FormGroup;
  editForm!: FormGroup;
  constructor(
    private userManagementService: UserManagementService,
    private toastr: ToastrService,
    private _appService: AppService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.onGetAllCalims();
    this.onGetAllRoles();
    this.onGetAreas();
  }

  initForm() {
    this.addForm = this.fb.group({
      RoleName: [''],
      Claims: [[]],
      AreaIds: [[]],
    });

    this.editForm = this.fb.group({
      RoleName: [''],
      Claims: [[]],
      AreaIds: [[]],
    });
  }

  showDialog(role: any) {
    this.selectedRole = role;
    this.visible = true;

    this.editForm.patchValue({
      RoleName: role.roleName,
      Claims: role.claims?.map((c: any) => c.value) || [],
      AreaIds: role.areas?.map((a: any) => a.areaId) || [],
    });
    this.editForm.get('RoleName')?.disable();
  }
  onEditRole() {
    const formData = this.editForm.getRawValue();

    const claimsPayload = formData.Claims.map((claim: string) => ({
      type: claim,
      value: claim,
    }));

    this.userManagementService
      .updateRole(formData.RoleName, claimsPayload, formData.AreaIds)
      .subscribe({
        next: (res) => {
          this.visible = false;
          this.onGetAllRoles();
          this.toastr.success(res.message || 'Role updated successfully');
        },
        error: (err) => {
          console.error('Full error:', err);
          this.toastr.error('Role updated failed');
        },
      });
  }

  onGetAreas() {
    this._appService.getAllAreasAndRoles().subscribe({
      next: (res) => {
        this.allAreas = res.areas;
        console.log(this.allAreas);
      },
    });
  }

  onGetAllRoles(roleName?: string, claims?: string) {
    this.userManagementService.getRolesDetails(roleName, claims).subscribe({
      next: (res) => {
        this.allRolesDetails = res;
        this.originalRolesDetails = [...res];
        console.log(res);
        this.onGetRoles();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onRoleChange(selectedRole: any) {
    const roleName =
      typeof selectedRole === 'string' ? selectedRole : selectedRole?.name;

    if (!roleName || roleName === 'All') {
      this.allRolesDetails = [...this.originalRolesDetails];
    } else {
      this.allRolesDetails = this.originalRolesDetails.filter(
        (role) => role.roleName.toLowerCase() === roleName.toLowerCase()
      );
    }
  }

  onClaimChange(selectedClaim: any) {
    const claimName =
      typeof selectedClaim === 'string'
        ? selectedClaim
        : selectedClaim?.claimName;

    if (!claimName || claimName === 'All') {
      this.allRolesDetails = [...this.originalRolesDetails];
    } else {
      this.allRolesDetails = this.originalRolesDetails.filter((role) =>
        role.claims?.some(
          (claim: { value: string; type: string }) =>
            claim.value.toLowerCase() === claimName.toLowerCase() ||
            claim.type.toLowerCase() === claimName.toLowerCase()
        )
      );
    }
  }

  addRole() {
    if (this.addForm.invalid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    const formValue = this.addForm.value;

    const formattedClaims = formValue.Claims.map((id: number) => {
      const claim = this.claimsList.find((c) => c.id === id);
      return {
        type: claim?.claimName,
        value: claim?.claimName,
      };
    });

    this.userManagementService
      .addRole(formValue.RoleName, formattedClaims, formValue.AreaIds)
      .subscribe({
        next: (data) => {
          this.toastr.success(data.message || 'Role added successfully');
          this.addForm.reset({
            RoleName: '',
            Claims: [],
            AreaIds: [],
          });
          this.onGetAllRoles();
        },
        error: (err) => {
          console.error('Full error:', err);
          this.toastr.error(err.error?.title || 'An error occurred');
        },
      });
  }

  onGetAllCalims() {
    this._appService.getAllClaims().subscribe({
      next: (res) => {
        this.claimsList = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onGetRoles() {
    this.userManagementService.getRoles().subscribe({
      next: (res) => {
        this.allRoles = res;
        this.allRoles = [{ name: 'All' }, ...res];
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openDeleteDialog(roleName: string) {
    this.selectedRoleName = roleName;
    this.showDeleteDialog = true;
  }

  onCancelDelete() {
    this.showDeleteDialog = false;
  }

  onDeleteRole() {
    if (!this.selectedRoleName) return;

    this.userManagementService.deleteRole(this.selectedRoleName).subscribe({
      next: (res) => {
        console.log(res);
        this.onGetAllRoles();
        this.showDeleteDialog = false;
        this.toastr.success(res.message || 'Role deleted successfully');
      },
      error: (err) => {
        console.error(err);
        this.showDeleteDialog = false;
        this.toastr.error('Role deleted failed');
      },
    });
  }
}

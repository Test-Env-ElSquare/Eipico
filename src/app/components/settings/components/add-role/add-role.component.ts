import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app-Service.service';
import { IArea, Iclamis, IRole } from 'src/app/views/pages/auth/models/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  originalRolesDetails: any[] = [];
  allRoles: IRole[] = [];
  selectedRole: string | undefined = undefined;
  selectedAreas: number[];
  allAreas: IArea[] = [];
  form: FormGroup;
  showDeleteDialog: boolean = false;
  selectedRoleName: string = '';
  visible: boolean = false;

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
    this.form = this.fb.group({
      RoleName: [''],
      Claims: [[]],
      AreaIds: [[]],
    });
  }
  showDialog(role: any) {
    this.selectedRole = role;
    this.visible = true;
    this.form.patchValue({
      RoleName: role.roleName,
      Claims: role.claims,
      AreaIds: role.areas?.map((a: any) => a.areaId) || [],
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

  onRoleChange(selectedRole?: string) {
    if (selectedRole === 'All' || !selectedRole) {
      this.onGetAllRoles();
    } else {
      this.userManagementService.getRolesDetails().subscribe({
        next: (res) => {
          this.allRoles = res.filter(
            (role: any) => role.roleName === selectedRole
          );
        },
        error: (err) => console.error(err),
      });
    }
  }

  onClaimChange(selectedClaim?: string) {
    if (!selectedClaim || selectedClaim === 'All') {
      this.allRolesDetails = [...this.originalRolesDetails];
    } else {
      this.allRolesDetails = this.originalRolesDetails.filter((role: any) =>
        role.claims.some(
          (claim: any) =>
            claim.value.toLowerCase() === selectedClaim.toLowerCase() ||
            claim.type.toLowerCase() === selectedClaim.toLowerCase()
        )
      );
    }
  }

  addRole() {
    if (this.form.invalid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    const formValue = this.form.value;

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
          this.form.reset({
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
      },
      error: (err) => {
        console.error(err);
        this.showDeleteDialog = false;
      },
    });
  }
  onEditRole() {}
}

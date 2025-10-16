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
  allRoles: IRole[] = [];
  selectedRole: string | undefined = undefined;
  selectedAreas: number[];
  allAreas: IArea[] = [];
  form: FormGroup;

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
        console.log(res);
        this.onGetRoles();
 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

    onRoleChange() {
    if(this.selectedRole === 'All'){
      this.onGetAllRoles();
    }
    else{
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
  onGetRoles(){
    this.userManagementService.getRoles().subscribe({
      next:(res)=>{
        this.allRoles = res;
          this.allRoles = [{ name: 'All' }, ...res];
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
    onDeleteRole(roleName: string){

    this.userManagementService.deleteRole(roleName).subscribe({

      next:(res)=>{
        this.onGetAllRoles();
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}

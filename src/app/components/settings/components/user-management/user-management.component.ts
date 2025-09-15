import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IAllUSers, IFactory, roles } from '../../models/model';
import { UserManagementService } from '../../services/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { IArea, Iclamis, IProfile } from 'src/app/views/pages/auth/models/auth';
import { AppService } from 'src/app/core/services/app-Service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  form: FormGroup;
  roles: roles[];
  factoryList: IFactory[];
  isRoleAdmin: boolean = false;
  tableOfUsers: IAllUSers[];
  filteredUsers: any[] = [];
  allRoles: any[] = [];
  selectedRole: string | undefined = undefined;
  searchText: string = '';
  showEditDialog: boolean = false;
  allClaims: Iclamis[] = [];
  profileToEdit: IProfile | null = null;
  allAreas: IArea[] = [];
  selectedUser: any;
  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private _appService: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.onGetAllUsers();
    this.loadAllStaticData();
  }
  loadAllStaticData(): void {
    // Get All Claims
    this._appService.getAllClaims().subscribe((res) => {
      this.allClaims = res;
    });

    // Get All Areas
    this._appService.getAllAreasAndRoles().subscribe((res) => {
      this.allAreas = res.areas;
    });

    // لو عندك API للأدوار
    this._appService.getAllAreasAndRoles().subscribe((res) => {
      this.allRoles = res.roles;
    });
  }
  initForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'
          ),
        ],
      ],
      roleName: ['', Validators.required],
    });
  }

  getRoles() {
    this.userManagementService.getRoles().subscribe({
      next: (data: any) => {
        this.roles = data;
      },
    });
  }

  addUser() {
    const userForm = this.form.value;
    this.userManagementService.addUser(userForm).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.form.reset();
        this.onGetAllUsers();
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message);
        this.form.reset();
      },
    });
  }

  onGetAllUsers(role?: string, email?: string) {
    this.userManagementService.getAllUSers(role, email).subscribe({
      next: (res) => {
        this.tableOfUsers = res;
        this.filteredUsers = res;

        if (!this.allRoles.length) {
          this.allRoles = [...new Set(res.map((u: any) => u.roleName))];
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onRoleChange() {
    this.onGetAllUsers(this.selectedRole || undefined);
  }
  onSearchClick() {
    this.onGetAllUsers(this.selectedRole, this.searchText);
    console.log('search', this.searchText);
  }
  openEditDialog(user: IProfile) {
    this.selectedUser = user;
    this.showEditDialog = true;
  }
}

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/Auth.service';
import {
  IArea,
  Iclamis,
  IProfile,
  IRole,
  UpdateAdminProfile,
  UpdateUserProfile,
  updateUserProfileByAdmin,
} from '../models/auth';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/core/services/app-Service.service';
import { Lines } from 'src/app/core/models/lines';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/components/settings/services/user-management.service';
import { IAllUSers } from 'src/app/components/settings/models/model';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  data!: UpdateAdminProfile;
  profile!: IProfile | null;
  showNavbar: boolean = false;

  @Input() allAreas: IArea[] = [];
  @Input() allClaims: Iclamis[] = [];
  @Input() allRoles: IRole[] = [];

  @Input() profileToEdit: IProfile | null = null;
  tableOfUsers: IAllUSers[];
  items: MenuItem[] = [];
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  // showEditDialog: boolean = false;
  profileForm: any;
  userId: any;
  @Output() usersUpdated: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private _AuthService: AuthService,
    private fb: FormBuilder,
    private _appService: AppService,
    private _Router: Router,
    private userManagementService: UserManagementService,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      userId: [''],
      username: [''],
      email: [''],
      phoneNumber: [''],
      currentPassword: [''],
      newPassword: [''],
      roleName: [''],
      areas: [''],
      claims: [''],
    });
  }

  ngOnInit(): void {
    // this.onGetAllClaims();
    // this.onGetAreas();
    document.body.classList.add('hide-navbar');

    if (!this.profileToEdit) {
      this._AuthService.getMyProfile().subscribe({
        next: (res: IProfile) => {
          this.profile = res;
          this.userId = res.id;

          this.profileForm.patchValue({
            username: res.username,
            email: res.email,
            phoneNumber: res.phoneNumber,
            roleName: res.roleName,
            areas: res.areas,
            claims: res.claims,
          });
        },
        error: (err) => console.error(' Error loading self profile:', err),
      });
    }
    // this.updateNavbarVisibility(this._Router.url);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profileToEdit'] && this.profileToEdit) {
      this.userId = this.profileToEdit.id;
      this.profileForm.patchValue({
        username: this.profileToEdit.username,
        email: this.profileToEdit.email,
        phoneNumber: this.profileToEdit.phoneNumber,
        roleName: this.profileToEdit.roleName,
        areas: this.profileToEdit.areas,
        claims: this.profileToEdit.claims,
      });
    }
  }
  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  // updateNavbarVisibility(url: string): void {
  //   if (url.includes('/settings/userMangement')) {
  //     this.showNavbar = false;
  //   } else if (url.includes('/auth/edit-profile')) {
  //     this.showNavbar = true;
  //   } else {
  //     this.showNavbar = true;
  //   }
  // }
  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  isEditBySuperAdmin(): boolean {
    return this.profileToEdit != null;
  }

  isUserSelf(): boolean {
    return (
      !this.profileToEdit &&
      (this.profile?.roleName?.toLowerCase() === 'user' ||
        this.profile?.roleName?.toLowerCase() === 'admin')
    );
  }
  isSuperAdminSelf(): boolean {
    return (
      !this.profileToEdit &&
      this.profile?.roleName?.toLowerCase() === 'superadmin'
    );
  }

  onSubmitProfile() {
    // console.log(' Form submitted');
    // console.log('Form Valid:', this.profileForm.valid);
    // console.log('Form Values:', this.profileForm.value);
    // console.log('isEditBySuperAdmin:', this.isEditBySuperAdmin());
    // console.log('isUserSelf:', this.isUserSelf());
    // console.log('isSuperAdminSelf:', this.isSuperAdminSelf());

    if (!this.profileForm.valid) return;

    if (this.isEditBySuperAdmin()) {
      this.onUpdateUserProfileByAdmin();
    } else if (this.isUserSelf() || this.isSuperAdminSelf()) {
      this.onUpdateUserProfile();
    } else {
    }
  }

  onUpdateUserProfile() {
    const data: UpdateUserProfile = {
      userId: this.userId,
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      phoneNumber: this.profileForm.value.phoneNumber,
      currentPassword: this.profileForm.value.currentPassword,
      newPassword: this.profileForm.value.newPassword,
    };

    this._AuthService.editUserProfile(data).subscribe({
      next: (res) => console.log('User Profile updated:', res),
      complete: () => {
        localStorage.clear();
        this._Router.navigate(['auth/login']);
      },
    });
  }
  onUpdateUserProfileByAdmin() {
    if (!this.profileToEdit || !this.profileToEdit.id) {
      console.error(' Cannot update: userId is missing!');
      return;
    }

    const data: updateUserProfileByAdmin = {
      userId: this.profileToEdit?.id ?? '',
      role: this.profileForm.value.roleName,
      // ? [this.profileForm.value.roleName]
      // : [],
    };

    console.log('Final Request Data:', data);

    this._AuthService.editUserProfileByAdmin(data).subscribe({
      next: (res) => {
        console.log(' Admin updated user profile:', res);
      },
      error: (err) => {
        console.error(' Error while updating:', err);
      },
      complete: () => {
        this.usersUpdated.emit();
      },
    });
  }

  onGetAreas() {
    this._appService.getAllAreasAndRoles().subscribe({
      next: (res) => {
        this.allRoles = res.roles;
        this.allAreas = res.areas;
        console.log(this.allAreas);
      },
    });
  }

  onGetAllClaims() {
    this._appService.getAllClaims().subscribe({
      next: (res) => {
        this.allClaims = res;
        console.log(this.allClaims);
      },
    });
  }
  ngOnDestroy() {
    document.body.classList.remove('hide-navbar');
  }
}

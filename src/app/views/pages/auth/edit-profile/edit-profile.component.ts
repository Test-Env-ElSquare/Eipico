import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private fb: FormBuilder,
    private _appService: AppService,
    private _Router: Router
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
  data!: UpdateAdminProfile;
  profile!: IProfile | null;
  @Input() allAreas: IArea[] = [];
  @Input() allClaims: Iclamis[] = [];
  @Input() profileToEdit: IProfile | null = null;
  items: MenuItem[] = [];
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  profileForm: any;
  userId: any;

  allRoles: IRole[] = [];

  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
  ngOnInit(): void {
    this.onGetAllClaims();
    this.onGetAreas();
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

  onSubmitProfile() {
    console.log(' Form submitted');
    console.log('Form Valid:', this.profileForm.valid);
    console.log('Form Values:', this.profileForm.value);
    console.log('isEditBySuperAdmin:', this.isEditBySuperAdmin());
    console.log('isUserSelf:', this.isUserSelf());

    if (!this.profileForm.valid) return;

    if (this.isEditBySuperAdmin()) {
      this.onUpdateUserProfileByAdmin();
    } else if (this.isUserSelf()) {
      this.onUpdateUserProfile();
    } else {
      console.warn(' No matching condition, nothing called!');
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
      roles: this.profileForm.value.roleName
        ? [this.profileForm.value.roleName]
        : [],
      claims: (this.profileForm.value.claims || []).map((c: any) =>
        typeof c === 'string' ? c : c.claimName
      ),
      areaIds: this.profileForm.value.areas
        ? Array.isArray(this.profileForm.value.areas)
          ? this.profileForm.value.areas
          : [this.profileForm.value.areas]
        : [],
    };

    console.log('Final Request Data:', data);

    this._AuthService.editUserProfileByAdmin(data).subscribe({
      next: (res) => {
        console.log('✅ Admin updated user profile:', res);
        this._Router.navigate(['auth/login']);
      },
      error: (err) => {
        console.error(' Error while updating:', err);
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
}

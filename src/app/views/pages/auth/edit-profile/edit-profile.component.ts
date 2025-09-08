import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/Auth.service';
import {
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
  ) {}
  data!: UpdateAdminProfile;
  profile!: IProfile | null;
  allAreas: Lines[] = [];
  allClaims: Iclamis[] = [];
  items: MenuItem[] = [];
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  profileForm: any;
  userId: any;

  roles: IRole[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
  ];

  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [''],
      email: [''],
      phoneNumber: [''],
      currentPassword: [''],
      newPassword: [''],
      roleName: [''],
      areas: [''],
      claims: [''],
    });

    this._AuthService.loadProfile();
    this._AuthService.profile$.subscribe((p) => {
      this.profile = p;
      if (p) {
        this.userId = p.id;
        this.profileForm.patchValue({
          username: p.username,
          email: p.email,
          phoneNumber: p.phoneNumber,
          roleName: p.roleName,
          areas: p.areas,
          claims: p.claims,
        });
        if (p.roleName?.toLowerCase() === 'admin') {
          this.onGetAreasFromLines();
          this.onGetAllClaims();
        }
      }
    });
  }
  isAdmin(): boolean {
    return this.profile?.roleName?.toLowerCase() === 'admin';
  }

  isUser(): boolean {
    return this.profile?.roleName?.toLowerCase() === 'user';
  }
  onSubmitProfile() {
    if (!this.profileForm.valid) return;

    if (this.isAdmin()) {
      this.onUpdateUserProfileByAdmin();
    } else if (this.isUser()) {
      this.onUpdateUserProfile();
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
    const data: updateUserProfileByAdmin = {
      userId: this.profile?.id ?? '',
      roles: [this.profileForm.value.roleName],
      claims: this.profileForm.value.claims,
      areaIds: this.profileForm.value.areaIds,
    };
    this._AuthService.editUserProfileByAdmin(data).subscribe({
      next: (res) => console.log('Admin updated user profile:', res),
      error: (err) => console.error('Error while updating:', err),
    });
  }

  onGetAreasFromLines() {
    this._appService.getAllLines().subscribe({
      next: (res) => {
        this.allAreas = res;
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

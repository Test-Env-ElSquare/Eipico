import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/Auth.service';
import {
  Iclamis,
  IProfile,
  IRole,
  UpdateAdminProfile,
  updateUserProfileByAdmin,
} from '../models/auth';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/core/services/app-Service.service';
import { Lines } from 'src/app/core/models/lines';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private fb: FormBuilder,
    private _appService: AppService
  ) {}
  data!: UpdateAdminProfile;
  profile!: IProfile | null;
  allAreas: Lines[] = [];
  items: MenuItem[] = [];
  currentStep = 1;
  activeIndex: number = 0;
  profileForm: FormGroup;
  ngOnInit(): void {
    this._AuthService.loadProfile();
    this._AuthService.profile$.subscribe((p) => {
      this.profile = p;
      // init form
      this.profileForm = this.fb.group({
        username: [p?.username || ''],
        email: [p?.email || ''],
        phoneNumber: [p?.phoneNumber || ''],
        currentPassword: [''],
        newPassword: [''],
        roleName: [p?.roleName || ''],
        areas: [p?.areas || ''],
        claims: [p?.claims || ''],
      });
    });
    // this._AuthService.loadProfile();
    // this._AuthService.profile$.subscribe((p) => {
    //   this.profile = p;
    //   if (p) {
    //     this.profileForm.patchValue({
    //       username: p.username,
    //       email: p.email,
    //       phoneNumber: p.phoneNumber,
    //       roleName: p.roleName,
    //       areas: p.areas,
    //       claims: p.claims,
    //     });
    //   }
    // });
    this.onGetAreasFromLines();
  }
  roles: IRole[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
  ];
  clamis: Iclamis[] = [
    { id: 1, name: 'claim-one' },
    { id: 2, name: 'claim-two' },
    { id: 3, name: 'claim-three' },
  ];
  // goToStep(step: number) {
  //   this.currentStep = step;
  // }
  // next() {
  //   this.activeIndex = this.activeIndex + 1;
  // }

  // prev() {
  //   this.activeIndex = this.activeIndex - 1;
  // }
  onSubmitProfile() {
    if (!this.profileForm.valid) return;

    if (this.isAdmin()) {
      this.onUpdateUserProfileByAdmin();
    } else if (this.isUser()) {
      this.onUpdateUserProfile();
    }
  }
  isAdmin(): boolean {
    return this.profile?.roleName?.toLowerCase() === 'admin';
  }

  isUser(): boolean {
    return this.profile?.roleName?.toLowerCase() === 'user';
  }

  onUpdateUserProfile() {
    if (this.profileForm.valid) {
      const updatedData: UpdateAdminProfile = this.profileForm.value;
      this._AuthService.editAdminProfile(updatedData).subscribe({
        next: (res) => {
          console.log('Profile updated:', res);
        },
      });
    }
  }
  onUpdateUserProfileByAdmin() {
    if (this.profileForm.valid) {
      const updatedDataByAdmin: updateUserProfileByAdmin =
        this.profileForm.value;
      this._AuthService.editAdminProfile(updatedDataByAdmin).subscribe({
        next: (res) => {
          console.log('Profile updated:', res);
        },
      });
    }
  }
  onGetAreasFromLines() {
    this._appService.getAllLines().subscribe({
      next: (res) => {
        this.allAreas = res;
        console.log(res);
      },
    });
  }
}

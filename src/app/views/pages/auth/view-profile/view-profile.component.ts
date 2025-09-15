import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
// import { AuthService } from 'src/app/core/services/Auth.service';
import { AuthService } from '../../../../core/services/Auth.service';
import { IProfile } from '../models/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  constructor(private authService: AuthService, private _Router: Router) {}
  userData: IProfile;
  ngOnInit(): void {
    this.onGetProfileData();
  }
  onGetProfileData() {
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        // localStorage.setItem('Token', res.token);
        this.userData = res;
        console.log(this.userData);
      },
      error: (err) => {
        console.log('error', err);
        console.log('>???????? test github');
      },
    });
  }
  onLogout(e: any) {
    e.preventDefault();
    this._Router.navigate(['/auth/login']);
    this.authService.logOut();
  }
}

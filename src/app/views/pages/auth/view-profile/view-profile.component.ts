import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
// import { AuthService } from 'src/app/core/services/Auth.service';
import { AuthService } from '../../../../core/services/Auth.service';
import { IProfile } from '../models/auth';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}
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
        console.log('erroreeeee', err);
        console.log('>???????? test github');
      },
    });
  }
}

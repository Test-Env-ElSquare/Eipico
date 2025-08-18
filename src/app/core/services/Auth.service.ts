import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  IProfile,
  UpdateAdminProfile,
  UpdateUserProfile,
  updateUserProfileByAdmin,
} from 'src/app/views/pages/auth/models/auth';
export interface LoginResponse {
  token: string;
  user: string;
  expiration: string;
  roleName: string;
  claims: Claim[];
  message: string;
  status: string;
}
export interface UserAccess {
  HasAccessToE1: string;
  HasAccessToE2: string;
  HasAccessToMainDashboards: string;
  HasAccessToHistoricalDashboards: string;
  HasAccessToProductionPlan: string;
  HasAccessToProductionPlanAndAdd: string;
  HasAccessToProductionPlanAndEdit: string;
  HasAccessToProductionPlanAndDelete: string;
  HasAccessToMachineStatus: string;
  HasAccessToLineMachine: string;
  HasAccessToEnergyReport: string;
  HasAccessToBeconReport: string;
  HasAccessToBatchSettings: string;
  HasAccessToBatchSettingsAndPrint: string;
  HasAccessToBatchSettingsAndDelete: string;
  HasAccessToBatchWeight: string;
  HasAccessToBatchHistory: string;
  HasAccessToBatchSchedulerView: string;
  HasAccessToBatchSchedulerViewAndActivate: string;
  HasAccessToBatchSchedulerViewAndFinish: string;
  HasAccessToScaleHistory: string;
  HasAccessToMaterialControl: string;
  HasAccessToStoppagePlan: string;
  HasAccessToLineSettings: string;
  HasAccessToMachineSettings: string;
  HasAccessToscada: string;
  HasAccessToProductionSettings: string;
  HasAccessToAddRole: string;
  HasAccessToUserManagement: string;
  HasAccessToEverything: string;
}

export interface Claim {
  type: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //to emit that the user loged in
  private jwtHelper = new JwtHelperService();
  public cureentUserSubject: BehaviorSubject<UserAccess | null | any>;
  public cureentUserName: any;
  public userClaims: any;
  public currentUserValue: Observable<any>;
  public permissions: any;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('Token');
    if (token) {
      try {
        if (!this.jwtHelper.isTokenExpired(token)) {
          this.userClaims = this.jwtHelper.decodeToken(token);
          this.permissions = this.userClaims?.permissions || '';
        } else {
          localStorage.removeItem('Token');
        }
      } catch (err) {
        console.error('Invalid token in localStorage, clearing...', err);
        localStorage.removeItem('Token');
      }
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.permissions);
  }
  public get CurrentUser(): LoginResponse {
    return this.cureentUserName;
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      this.cureentUserSubject = decoded;
      return decoded;
    } catch (Error) {
      console.error('Invalid token:', Error);
      return null;
    }
  }

  isHasAccessToE1(): boolean {
    if (this.userClaims?.HasAccessToE1 == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToE2(): boolean {
    if (this.userClaims?.HasAccessToE2 == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToMaterialControl(): boolean {
    if (this.userClaims?.HasAccessToMaterialControl == 'true') {
      return true;
    } else {
      return false;
    }
  }

  // isHasAccessToStoppagePlan(): boolean {
  //   if (this.userClaims?.HasAccessToStoppagePlan == 'true') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  isHasAccessToMainDashboards(): boolean {
    if (this.userClaims?.HasAccessToMainDashboards == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToHistoricalDashboards(): boolean {
    if (this.userClaims?.HasAccessToHistoricalDashboards == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToLineSettings(): boolean {
    if (this.userClaims?.HasAccessToLineSettings == 'true') {
      return true;
    } else {
      return false;
    }
  }
  isHasAccessToEvery(): boolean {
    return this.permissions?.HasAccessToEverything === 'true';
  }

  isHasAccessToAddRole(): boolean {
    if (this.userClaims?.HasAccessToAddRole == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToUserManagement(): boolean {
    if (this.userClaims?.HasAccessToUserManagement == 'true') {
      return true;
    } else {
      return true;
    }
  }

  isHasAccessToProductionPlan(): boolean {
    if (this.userClaims?.HasAccessToProductionPlan == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToscada(): boolean {
    if (this.userClaims?.HasAccessToscada == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToProductionPlanAndAdd(): boolean {
    if (this.userClaims?.HasAccessToProductionPlanAndAdd == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToProductionPlanAndEdit(): boolean {
    if (this.userClaims?.HasAccessToProductionPlanAndEdit == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToProductionPlanAndDelete(): boolean {
    if (this.userClaims?.HasAccessToProductionPlanAndDelete == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToMachineStatus(): boolean {
    if (this.userClaims?.HasAccessToMachineStatus == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToLineMachine(): boolean {
    if (this.userClaims?.HasAccessToLineMachine == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToEnergyReport(): boolean {
    if (this.userClaims?.HasAccessToEnergyReport == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBeconReport(): boolean {
    if (this.userClaims?.HasAccessToBeconReport == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchSettings(): boolean {
    if (this.userClaims?.HasAccessToBatchSettings == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchSettingsAndPrint(): boolean {
    if (this.userClaims?.HasAccessToBatchSettingsAndPrint == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchSettingsAndDelete(): boolean {
    if (this.userClaims?.HasAccessToBatchSettingsAndDelete == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchWeight(): boolean {
    if (this.userClaims?.HasAccessToBatchWeight == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchHistory(): boolean {
    if (this.userClaims?.HasAccessToBatchHistory == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchSchedulerView(): boolean {
    if (this.userClaims?.HasAccessToBatchSchedulerView == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToMachineSettings(): boolean {
    if (this.userClaims?.HasAccessToMachineSettings == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToProductionSettings(): boolean {
    if (this.userClaims?.HasAccessToProductionSettings == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchSchedulerViewAndActivate(): boolean {
    if (this.userClaims?.HasAccessToBatchSchedulerViewAndActivate == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToBatchSchedulerViewAndFinish(): boolean {
    if (this.userClaims?.HasAccessToBatchSchedulerViewAndFinish == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToScaleHistory(): boolean {
    if (this.userClaims?.HasAccessToScaleHistory == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToAddMaterial(): boolean {
    if (this.userClaims?.HasAccessToAddMaterial == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToEditMaterial(): boolean {
    if (this.userClaims?.HasAccessToEditMaterial == 'true') {
      return true;
    } else {
      return false;
    }
  }

  isHasAccessToDeleteMaterial(): boolean {
    if (this.userClaims?.HasAccessToDeleteMaterial == 'true') {
      return true;
    } else {
      return false;
    }
  }

  //remove user data from local storage
  //emit BehaviorSubject and reset the to null
  logOut() {
    localStorage.clear();
    // this.userClaims?.next(null);
  }

  //return response from api with specifice type
  //map the response to check if there is response from back end or not
  //set the response value to localStorage
  Login(formData: object): Observable<any> {
    return this.http.post<any>(
      environment.baseUrl + 'api/Auth/login',
      formData
    );
  }
  private profileSubject = new BehaviorSubject<IProfile | null>(null);
  profile$ = this.profileSubject.asObservable(); // يقدر أي كمبوننت يشترك فيه
  getMyProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(environment.baseUrl + 'api/Auth/MyProfile');
  }
  loadProfile() {
    this.getMyProfile().subscribe({
      next: (res) => this.profileSubject.next(res),
      error: (err) => console.error('Error loading profile', err),
    });
  }
  editAdminProfile(data: UpdateAdminProfile): Observable<UpdateAdminProfile> {
    return this.http.put<UpdateAdminProfile>(
      environment.baseUrl + 'api/Auth/admin/update-user',
      data
    );
  }
  editUserProfile(data: UpdateUserProfile): Observable<UpdateUserProfile> {
    return this.http.put<UpdateUserProfile>(
      environment.baseUrl + 'api/Auth/user/update-user',
      data
    );
  }
  editUserProfileByAdmin(
    data: updateUserProfileByAdmin
  ): Observable<updateUserProfileByAdmin> {
    return this.http.put<updateUserProfileByAdmin>(
      environment.baseUrl + 'api/Auth/admin/update-user',
      data
    );
  }
}

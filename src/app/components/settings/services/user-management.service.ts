import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iclamis } from 'src/app/views/pages/auth/models/auth';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(private _http: HttpClient) {}

  addUser(userForm: any): Observable<any[]> {
    return this._http.post<any[]>(
      environment.url + 'api/Auth/register',
      userForm
    );
  }

  addRole(role: string, claims: string[], areas: number[]): Observable<any> {
    const mappedClaims = claims.map((c) => ({
      type: c,
      value: c,
    }));

    return this._http.post<any>(environment.url + 'api/Auth/AddRole', {
      roleName: role,
      claims: mappedClaims,
      areaIds: areas,
    });
  }

  getRoles(): Observable<any> {
    return this._http.get<any>(environment.url + 'api/Auth/Roles');
  }
  getAllUSers(role?: string, email?: string): Observable<any> {
    let params: any = {};
    if (role) {
      params.role = role;
    }
    if (email) {
      params.email = email;
    }
    return this._http.get<any>(environment.url + 'api/Auth/GetAllUsers', {
      params,
    });
  }
  getRolesDetails(roleName?: string, claims?: string): Observable<any> {
    let params: any = {};
    if (roleName) {
      params.roleName = roleName;
    }
    if (claims) {
      params.claims = claims;
    }
    return this._http.get<any>(environment.url + 'api/Auth/GetRoleDetails', {
      params,
    });
  }
}

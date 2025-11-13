import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claims, Iclamis } from 'src/app/views/pages/auth/models/auth';
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

  addRole(role: string, claims: any[], areaIds: number[]): Observable<any> {
    return this._http.post<any>(environment.url + 'api/Auth/AddRole', {
      roleName: role,
      claims: claims,
      areaIds: areaIds,
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
  getRolesDetails(roleName?: string, claimValues?: string): Observable<any> {
    let params: any = {};
    if (roleName) {
      params.roleName = roleName;
    }
    if (claimValues) {
      params.claimValues = claimValues;
    }
    return this._http.post<any>(environment.url + 'api/Auth/GetRoleDetails', {
      params,
    });
  }
  deleteRole(roleName: string): Observable<any> {
    return this._http.delete<any>(environment.url + 'api/Auth/DeleteRole', {
      params: { roleName: roleName },
    });
  }
  updateRole(roleName: string, claims: any[], areaIds: number[]) {
    return this._http.post<any>(environment.url + 'api/Auth/UpdateRole', {
      roleName: roleName,
      claims: claims,
      areaIds: areaIds,
    });
  }
}

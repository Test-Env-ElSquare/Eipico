import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addRole(role: string, claims: any): Observable<any> {
    return this._http.post<any>(environment.url + 'api/Auth/AddRole', {
      roleName: role,
      claims: claims,
    });
  }

  getRoles(): Observable<any> {
    return this._http.get<any>(environment.url + 'api/Auth/Roles');
  }
}

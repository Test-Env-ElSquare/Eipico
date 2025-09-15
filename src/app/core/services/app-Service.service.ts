import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { factory, Line, Skus } from '../models/filter';
import { skus } from 'src/app/components/Historical/models/model';
import { Lines } from '../models/lines';
import {
  IArea,
  Iclamis,
  IRoleAreaResponse,
} from 'src/app/views/pages/auth/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _http: HttpClient) {}

  GetAllFactories(): Observable<factory[]> {
    return this._http.get<factory[]>(
      environment.url + 'api/Factory/GetAllFactories'
    );
  }

  GetFactoryLines(factoryId: number): Observable<Line[]> {
    return this._http.get<Line[]>(
      environment.url + 'api/Factory/GetFactoryLines',
      {
        params: {
          factoryId: factoryId,
        },
      }
    );
  }

  public getDurationDropDown() {
    return [
      {
        name: 'Current Shift',
        id: 0,
      },
      {
        name: 'Last Shift',
        id: 1,
      },
      {
        name: 'Last 2 Shift',
        id: 2,
      },
      {
        name: 'Last 7 Days',
        id: 3,
      },
      {
        name: 'Last 30 Days',
        id: 4,
      },
    ];
  }

  GetAllSKUs(): Observable<Skus[]> {
    return this._http.get<Skus[]>(
      environment.url + 'api/Batch/GetAllBatchwithskus'
    );
  }

  //get skus new
  GetSkusNew(lineId: number, isPending: number): Observable<skus[]> {
    return this._http.get<skus[]>(
      environment.url + 'api/Dashboards/GetSkusNew',
      {
        params: {
          lineId: lineId,
          isPending: isPending,
        },
      }
    );
  }
  getAllLines(): Observable<Lines[]> {
    return this._http.get<Lines[]>(environment.url + 'api/Line/GetAllLines');
  }
  getAllClaims(): Observable<Iclamis[]> {
    return this._http.get<Iclamis[]>(environment.url + 'api/Auth/GetAllClaims');
  }
  getAllAreasAndRoles(): Observable<IRoleAreaResponse> {
    return this._http.get<IRoleAreaResponse>(
      environment.url + 'api/Auth/RoleAndAreaList'
    );
  }
}

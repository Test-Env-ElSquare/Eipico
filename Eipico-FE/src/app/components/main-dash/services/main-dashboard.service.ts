import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPartsPerDays, MainDashBoard, OEEDashobard } from '../models/model';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class MainDashboardService {
  public hubConnection: signalR.HubConnection;

  constructor(private _http: HttpClient) {}

  //get GetMainDashobard
  GetMainDashobard(duration: number): Observable<MainDashBoard[]> {
    return this._http.get<MainDashBoard[]>(
      environment.url + 'api/Dashboards/MainDashobard',
      {
        params: {
          duration: duration,
        },
      }
    );
  }

  //get GetOEEDashobard
  GetOEEDashobard(): Observable<OEEDashobard[]> {
    return this._http.get<OEEDashobard[]>(
      environment.url + 'api/Dashboards/OEEDashobard'
    );
  }

  //get EnergyConsumption
  GetEnergyConsumption(): Observable<GetPartsPerDays[]> {
    return this._http.get<GetPartsPerDays[]>(
      environment.url + 'api/Dashboards/GetPartsPerDays'
    );
  }
}

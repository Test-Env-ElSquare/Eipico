import { factory } from './../../../core/models/filter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BykonState,
  EnergyMachineState,
  HistoricalDashobardsPerHour,
  Transformars,
  TransformersReads,
} from '../model/model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private _http: HttpClient) {}

  HistoricalDashobardsPerHour(
    factoryId: number,
    lineId: number,
    date: string
  ): Observable<{ fillers: HistoricalDashobardsPerHour[] }[]> {
    return this._http.get<{ fillers: HistoricalDashobardsPerHour[] }[]>(
      environment.url + 'api/Dashboards/HistoricalDashobardsPerHour',
      {
        params: {
          factoryId: factoryId,
          lineId: lineId,
          date: date,
        },
      }
    );
  }

  GetBykonState(): Observable<BykonState[][]> {
    return this._http.get<BykonState[][]>(
      environment.url + 'api/Bykon/BykonState'
    );
  }
  EnergyMachineState(): Observable<EnergyMachineState[]> {
    return this._http.get<EnergyMachineState[]>(
      environment.url + 'api/EnergyMachineState/EnergyMachineState'
    );
  }

  // GetAllTransformars(factoryId: number): Observable<Transformars[]> {
  //   return this._http.get<Transformars[]>(
  //     environment.url + `api/Dashboards/GetAllTransformars?${factoryId}`
  //   );
  // }
  GetAllTransformars(factoryId: number): Observable<Transformars[]> {
    return this._http.get<Transformars[]>(
      environment.url + 'api/Dashboards/GetAllTransformars',
      {
        params: {
          factoryId: factoryId,
        },
      }
    );
  }
  GetAllTransformarsperFactory(factoryId: number): Observable<Transformars[]> {
    return this._http.get<Transformars[]>(
      environment.url +
        'api/Dashboards/GetAllTransformars?factoryId=' +
        factoryId
    );
  }

  TransformersReads(
    transformer: string,
    start: string,
    end: string
  ): Observable<any> {
    return this._http.get<any>(
      environment.url + 'api/Dashboards/TransformersReads',
      {
        params: {
          transformer: transformer,
          start: start,
          End: end,
        },
      }
    );
  }
}

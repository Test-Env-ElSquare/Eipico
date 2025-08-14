import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rooms, ScaleReads } from '../model/model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ScaleService {
  constructor(private _http: HttpClient) {}
  GetRoomsScales(roomid: number, factoryId: number): Observable<Rooms[]> {
    return this._http.get<Rooms[]>(
      environment.url + 'api/ScaleHistory/GetRoomScales',
      {
        params: {
          roomid: roomid,
          factoryId: factoryId,
        },
      }
    );
  }
  getRoomsById(factoryId: number): Observable<number> {
    return this._http.get<number>(
      environment.url + 'api/ScaleHistory/GetRoomsPerFactoryId',
      {
        params: {
          factoryId: factoryId,
        },
      }
    );
  }
  GetScaleReads(
    scaleid: string,
    pagesize: number,
    pagenum: number
  ): Observable<ScaleReads[]> {
    return this._http.get<ScaleReads[]>(
      environment.url + 'api/ScaleHistory/GetScaleReads',
      {
        params: {
          scaleid: scaleid,
          pagesize: pagesize,
          pagenum: pagenum,
        },
      }
    );
  }
}

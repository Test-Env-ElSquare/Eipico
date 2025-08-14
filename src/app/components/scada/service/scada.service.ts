import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { scada } from '../models/model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScadaService {
  constructor(private _http: HttpClient) {}

  GetScada(lineId: number): Observable<scada[]> {
    return this._http.get<scada[]>(environment.url + `api/Scada`, {
      params: {
        lineId: lineId,
      },
    });
  }
}

import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShift } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  constructor(private _http: HttpClient) {}
  getAllShifts(): Observable<IShift> {
    return this._http.get<IShift>(environment.url + 'api/Shift/GetAllShifts');
  }
}

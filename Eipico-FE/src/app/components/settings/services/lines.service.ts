import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lineS } from '../models/model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  constructor(
    private _http:HttpClient
  ) { }

  GetAllLines():Observable<lineS[]>{
    return this._http.get<lineS[]>(environment.url + 'api/Line/GetAllLines')
  }

  GetLine(id:number):Observable<lineS>{
    return this._http.get<lineS>(environment.url + 'api/Line/id',{
      params:{
        id:id
      }
    })
  }

  InsertLine(obj:lineS){
    return this._http.post(environment.url + 'api/Line/InsertLine',obj)
  }

  UpdateLine(obj:lineS){
    return this._http.put(environment.url+'api/Line/UpdateLine',obj)
  }

  RemoveLine(obj:lineS){
    return this._http.delete(environment.url+'api/Line/RemoveLine',{
      body:obj
    })
  }
}

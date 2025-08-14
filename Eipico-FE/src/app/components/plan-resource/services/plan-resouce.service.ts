import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllSubReasons, GetStoppagePlan, StoppageReasons } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PlanResouceService {

  constructor(
    private _http:HttpClient
  ) { }

  add(obj:GetStoppagePlan){
    return this._http.post(environment.url+'api/Plan/InsertStoppagePlan',obj)
  }

  GetAllStoppagePlans(factoryId:number = 0 , date?:string ):Observable<GetStoppagePlan[]>{
    if(date){
      return this._http.get<GetStoppagePlan[]>(environment.url+'api/Plan/GetAllStoppagePlans',
      {
        params:{
          factoryId:factoryId,
          date:date
        }
      })
    }
    else {
      return this._http.get<GetStoppagePlan[]>(environment.url+'api/Plan/GetAllStoppagePlans', {
        params:{
          factoryId:factoryId
        }
      })
    }
  }

  GetStoppagePlanById(id:number):Observable<GetStoppagePlan>{
    return this._http.get<GetStoppagePlan>(environment.url + 'api/Plan/GetStoppagePlanById',{
      params:{
        id:id
      }
    })
  }

  UpdateStoppagePlan(obj:GetStoppagePlan){
    return this._http.put(environment.url + 'api/Plan/UpdateStoppagePlan',obj)
  }

  RemoveStoppagePlan(obj:GetStoppagePlan){
    return this._http.delete(environment.url + 'api/Plan/RemoveStoppagePlan',{
      body: obj
    })
  }

  StoppageReasons():Observable<StoppageReasons[]>{
    return this._http.get<StoppageReasons[]>(environment.url + 'api/StoppageReasons/GetAllMainReasons')
  }

  GetAllSubReasons(id:number):Observable<GetAllSubReasons[]>{
    return this._http.get<GetAllSubReasons[]>(environment.url + 'api/StoppageReasons/GetAllSubReasons',{
      params:{
        id:id
      }
    })
  }
}

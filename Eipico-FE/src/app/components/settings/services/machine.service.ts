import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Machine, machineData } from '../models/model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private _http:HttpClient) { }

  getAllMachines():Observable<Machine[]>{
    return this._http.get<Machine[]>(environment.url+'api/Machine/getAllMachines')
  }

  GetLineMachines(lineid : number):Observable<Machine[]>{
    return this._http.get<Machine[]>(environment.url + 'api/Machine/GetLineMachines',{
      params:{
        lineid:lineid
      }
    })
  }

  GetMachineById(id:number):Observable<machineData>{
    return this._http.get<machineData>(environment.url + 'api/Machine/GetMachineById',{
      params:{
        id:id
      }
    })
  }

  InsertMachine(obj:Machine){
    return this._http.post(environment.url+'api/Machine/InsertMachine',obj)
  }

  UpdateMachine(obj:Machine){
    return this._http.put(environment.url+'api/Machine/UpdateMachine',obj)
  }

  RemoveMachine(obj:Machine){
    return this._http.delete(environment.url+'api/Machine/RemoveMachine',{
      body:obj
    })
  }

}

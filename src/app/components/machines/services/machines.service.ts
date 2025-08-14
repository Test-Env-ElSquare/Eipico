import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MachineState, MachineTag, MachineTagProperties } from '../models/machineStatemodel';
import { GetLineMachines } from '../models/lineMachineModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {


  constructor(private _http:HttpClient) { }
  // this is to get the machine state
  GetMachineState(lineid : number):Observable<MachineState[][]>{
    return this._http.get<MachineState[][]>(environment.url + 'api/MachineState/MachineState',{
      params:{
        lineid:lineid
      }
    })
  }

  GetLineMachines(lineid:number):Observable<GetLineMachines[]>{
    return this._http.get<GetLineMachines[]>(environment.url+'api/Machine/GetLineMachines',{
      params:{
        lineid:lineid
      }
    })
  }

  MachineTag(MachineName:string,from:string,to:string,measure:number):Observable<MachineTag[][]>{
    return this._http.get<MachineTag[][]>(environment.url + 'api/MachineState/MachineTag',{
      params:{
        MachineID:MachineName,
        from:from,
        to:to,
        measure:measure
      }
    })
  }

  MachineTagProperties(MachineName:string):Observable<MachineTagProperties[][]>{
    return this._http.get<MachineTagProperties[][]>(environment.url + 'api/MachineState/MachineTagProperties',{
      params:{
        MachineID:MachineName
      }
    })
  }

}

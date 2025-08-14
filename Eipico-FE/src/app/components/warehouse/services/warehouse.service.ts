import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface WareHouse{
  keys: string[],
  data: [[string,string, number]]
}


@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  constructor(private _http:HttpClient) { }

  GetAllBatchName():Observable<string[]>{
    return this._http.get<string[]>(environment.url+'api/Batch/GetAllBatchName')
  }

  GetMatarialFlow(batchId:string="cc1356v"):Observable<WareHouse[]>{
    return this._http.get<WareHouse[]>(environment.url+'api/Warehouse/GetMatarialFlow',{
      params:{
        batchId:batchId
      }
    })
  }
}

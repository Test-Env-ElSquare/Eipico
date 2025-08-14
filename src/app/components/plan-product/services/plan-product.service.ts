import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProductPlans, GetAllProductPlans, planShiftMaterialConsumptionsObject } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PlanProductService {

  constructor(private _http:HttpClient) { }

  InsertProductPlan(obj:AddProductPlans) : Observable<AddProductPlans>{
    return this._http.post<AddProductPlans>(
      environment.url + `api/Plan/InsertProductPlan`, obj);
  }
  // get All products plans
  GetAllProductPlans(factoryId:number=0 , date?:string   ): Observable<GetAllProductPlans>{
   if(date){
    return this._http.get<GetAllProductPlans>(environment.url + "api/Plan/GetAllProductPlans",{
      params:{
        factoryId:factoryId,
        date:date
      }
    })
   }
   else{
      return this._http.get<GetAllProductPlans>(environment.url + "api/Plan/GetAllProductPlans",{
        params:{
          factoryId:factoryId
        }
      })
   }

  }

  GetPlanShiftMaterialConsumptionsById(id:number):Observable<planShiftMaterialConsumptionsObject> {
    return this._http.get<planShiftMaterialConsumptionsObject>(
      environment.url + `api/Plan/GetProductPlanById`,{
        params:{
          id:id
        }
      }
    );
  }

  EditPlanShiftMaterialConsumptions(obj:AddProductPlans) {
    return this._http.put( environment.url + `api/Plan/UpdateProductPlan`,obj );
  }

  RemoveProductPlan(obj:AddProductPlans|GetAllProductPlans){
    return this._http.delete(environment.url+'api/Plan/RemoveProductPlan',{
      body:obj
    })
  }

}


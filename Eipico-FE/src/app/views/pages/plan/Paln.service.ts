import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PalnService {

constructor(private http: HttpClient) { }
Factories():Observable<any> {
  return this.http.get(environment.sourceTest + `Factories` )
}
// resourceDownTimePlans/GetAllStopsAllTime
GetAllStopsAllTime():Observable<any> {
  return this.http.get(environment.sourceTest + `resourceDownTimePlans/GetAllStopsAllTime` )
}
Lines(line:any):Observable<any> {
  return this.http.get(environment.sourceTest + `Lines?FactoryId=${line}` )
}
Machine(lineID:any):Observable<any> {
  return this.http.get(environment.sourceTest + `Machine?lineId=${lineID}`)
}
GetAllMainReasons() {
  return this.http.get(
    environment.sourceTest + `StopsReasons/GetAllMainReasons`
  );
}
GetAllsubReasons(id:any) {
  return this.http.get(
    environment.sourceTest + `StopsReasons/GetAllsubReasons?id=${id}`
  );
}
resourceDownTimePlans(date:any) {
  return this.http.get(
    environment.sourceTest + `resourceDownTimePlans?dateTime=${date}`
  );
}
PostresourceDownTimePlans(obj:any) {
  return this.http.post(
    environment.sourceTest + `resourceDownTimePlans`, obj
  );
}
DeleteresourceDownTimePlans(id:any) {
  return this.http.delete(
    environment.sourceTest + `resourceDownTimePlans/deleteplan?id=${id}`
  );
}
GetPlanById(id:any) {
  return this.http.get(
    environment.sourceTest + `resourceDownTimePlans/GetPlanById?id=${id}`
  );
}

EditresourceDownTimePlans(id:any,obj:any) {
  return this.http.put(
    environment.sourceTest + `resourceDownTimePlans?id=${id}`, obj
  );
}

/////////////////////////////////////////////////////////////////////////////////


PlanShiftMaterialConsumptions(date:any) {
  return this.http.get(
    environment.sourceTest + `PlanShiftMaterialConsumptions/GetPlanShiftMaterialConsumptionsBySpecificDate?date=${date}`
  );
}
GetPlanShiftMaterialConsumptions() {
  return this.http.get(
    environment.sourceTest + `PlanShiftMaterialConsumptions/GetALLPlans`
  );
}
GetSKUsByFactoryLine(factory:any,line:any) {
  return this.http.get(
    environment.sourceTest + `SKUs/GetSKUsByFactoryLine?factory=${factory}&line=${line}`
  );
}
PostPlanShiftMaterialConsumptions(obj:any) {
  return this.http.post(
    environment.sourceTest + `PlanShiftMaterialConsumptions`, obj
  );
}

GetPlanShiftMaterialConsumptionsBySpecificDate(date:any,factoryid:any) {
  return this.http.get(
    environment.sourceTest + `PlanShiftMaterialConsumptions/GetPlanShiftMaterialConsumptionsBySpecificDate?date=${date}&factoryid=${factoryid}`
  );
}

EditPlanShiftMaterialConsumptions(id:any,obj:any) {
  return this.http.put(
    environment.sourceTest + `PlanShiftMaterialConsumptions/${id}`, obj
  );
}
GetPlanShiftMaterialConsumptionsById(id:any) {
  return this.http.get(
    environment.sourceTest + `PlanShiftMaterialConsumptions/${id}`
  );
}

DeletePlanShiftMaterialConsumptions(id:any) {
  return this.http.delete(
    environment.sourceTest + `PlanShiftMaterialConsumptions/${id}`
  );
}


}

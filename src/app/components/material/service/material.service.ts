import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AllMaterials, WareHouse } from '../modal/model';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private _http: HttpClient) {}

  // for flow WareHouse

  GetMatarialFlow(batchId: string = 'cc1356v'): Observable<WareHouse[]> {
    return this._http.get<WareHouse[]>(
      environment.url + 'api/Warehouse/GetMatarialFlow',
      {
        params: {
          batchId: batchId,
        },
      }
    );
  }

  //Get All Material for material control component

  GetAllMaterials(
    pagesize: number = 7,
    pagenum: number = 1
  ): Observable<AllMaterials[]> {
    return this._http.get<AllMaterials[]>(
      environment.url + 'api/Material/GetAllMaterials',
      {
        params: {
          pagesize: pagesize,
          pagenum: pagenum,
        },
      }
    );
  }

  // Delete for material control component

  DeleteMaterials(ids: number[]) {
    return this._http.request(
      'delete',
      environment.url + 'api/Material/DeleteMaterial',
      {
        body: ids,
      }
    );
  }

  //Putfor material control component

  UpdateMaterial(obj: AllMaterials) {
    return this._http.put(environment.url + 'api/Material/UpdateMaterial', obj);
  }

  // Postfor material control component

  InsertMaterial(obj: AllMaterials) {
    return this._http.post(
      environment.url + 'api/Material/InsertMaterial',
      obj
    );
  }

  //##################################################################
}

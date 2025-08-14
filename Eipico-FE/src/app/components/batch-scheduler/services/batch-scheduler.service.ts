import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { skus } from '../../Historical/models/model';

@Injectable({
  providedIn: 'root',
})
export class BatchSchedulerService {
  constructor(private _http: HttpClient) {}

  patchActivate(batchNumber: string, lineId: number) {
    return this._http.patch(
      environment.url + 'api/Dashboards/ActivationMode',
      {},
      {
        params: {
          lineid: lineId,
          batchNumber: batchNumber,
        },
      }
    );
  }

  getBatchesBySearch(
    batchNumber: string,
    lineId: number,
    isPending: number
  ): Observable<skus[]> {
    return this._http.get<skus[]>(
      environment.url + 'api/Dashboards/GetSkusNew',
      {
        params: {
          filter: batchNumber,
          lineId: lineId,
          isPending: isPending,
        },
      }
    );
  }

  patchFinish(batchNumber: string) {
    return this._http.patch(
      environment.url + 'api/Dashboards/UpdateToFinishingMode',
      {},
      {
        params: {
          batchNumber: batchNumber,
        },
      }
    );
  }
}

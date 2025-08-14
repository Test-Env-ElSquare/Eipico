import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Batch,
  BatchMatarials,
  PairedBatches,
  machineLoadDetails,
  scaleDetails,
} from '../models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private _http: HttpClient) {}

  getAll(
    pagenum: number = 1,
    pagesize: number = 7,
    filter?: string | null
  ): Observable<[Batch[], number]> {
    if (filter != null) {
      return this._http.get<[Batch[], number]>(
        environment.url + 'api/Batch/GetAll',
        {
          params: {
            pagenum: pagenum,
            pagesize: pagesize,
            filter: filter,
          },
        }
      );
    } else {
      return this._http.get<[Batch[], number]>(
        environment.url + 'api/Batch/GetAll',
        {
          params: {
            pagenum: pagenum,
            pagesize: pagesize,
          },
        }
      );
    }
  }

  getBatchMatarials(BatchId: string): Observable<BatchMatarials[]> {
    return this._http.get<BatchMatarials[]>(
      environment.url + 'api/Batch/GetBatchMatarials',
      {
        params: {
          BatchId: BatchId,
        },
      }
    );
  }

  RePrintBatch(batchName: string) {
    return this._http.post(
      environment.eipicoItInterfaceURL + 'api/Reprint/RePrintBatch',
      {},
      {
        params: {
          batchId: batchName,
        },
      }
    );
  }

  RePrintMatarial(uid: string) {
    return this._http.post(
      environment.eipicoItInterfaceURL + 'api/Reprint/RePrintMatarial',
      {},
      {
        params: {
          uid: uid,
        },
      }
    );
  }

  GetMachineLoadDetails(matarialuid: string): Observable<machineLoadDetails[]> {
    return this._http.get<machineLoadDetails[]>(
      environment.url + 'api/Batch/GetMachineLoadDetails',
      {
        params: {
          matarialuid: matarialuid,
        },
      }
    );
  }

  GetScaleDetails(
    matarialuid: string,
    isSplited: number
  ): Observable<scaleDetails> {
    return this._http.get<scaleDetails>(
      environment.url + 'api/Batch/GetScaleDetails',
      {
        params: {
          matarialuid: matarialuid,
          isSplited: isSplited,
        },
      }
    );
  }

  pairedBatches(
    pagenum: number,
    pagesize: number
  ): Observable<PairedBatches[]> {
    return this._http.get<PairedBatches[]>(
      environment.url + 'api/Batch/PairedBatches',
      {
        params: {
          pagenum: pagenum,
          pagesize: pagesize,
        },
      }
    );
  }
}

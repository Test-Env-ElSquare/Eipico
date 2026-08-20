import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface StoppageAlarm {
  id: number;
  scopeType: number;
  scopeName: string;
  reason: number;
  reasonName: string;
  lineId: number;
  lineName: string;
  machineId: number | null;
  machineName: string | null;
  from: string;
  to: string | null;
  alarmRaisedAt: string;
  durationMinutes: number;
  fault: string | null;
  isActive: boolean;
  isAcknowledged: boolean;
  acknowledgedAt: string | null;
  acknowledgedByUserId: string | null;
  acknowledgedByUserName: string | null;
}

export interface StoppageAlarmFilters {
  lineId?: number | null;
  machineId?: number | null;
  isActive?: boolean | null;
  isAcknowledged?: boolean | null;
  from?: string | null;
  to?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AlarmsService {
  constructor(private http: HttpClient) {}

  getStoppageAlarms(filters: StoppageAlarmFilters): Observable<StoppageAlarm[]> {
    let params = new HttpParams();

    if (filters.lineId) {
      params = params.set('LineId', filters.lineId);
    }
    if (filters.machineId) {
      params = params.set('MachineId', filters.machineId);
    }
    if (filters.isActive !== null && filters.isActive !== undefined) {
      params = params.set('IsActive', filters.isActive);
    }
    if (filters.isAcknowledged !== null && filters.isAcknowledged !== undefined) {
      params = params.set('IsAcknowledged', filters.isAcknowledged);
    }
    if (filters.from) {
      params = params.set('From', filters.from);
    }
    if (filters.to) {
      params = params.set('To', filters.to);
    }

    return this.http.get<StoppageAlarm[]>(
      environment.url + 'api/StoppageAlarms',
      { params }
    );
  }

  getStoppageAlarmById(id: number): Observable<StoppageAlarm> {
    return this.http.get<StoppageAlarm>(
      environment.url + 'api/StoppageAlarms/' + id
    );
  }

  acknowledgeStoppageAlarm(id: number): Observable<StoppageAlarm> {
    return this.http.patch<StoppageAlarm>(
      environment.url + 'api/StoppageAlarms/' + id + '/acknowledge',
      null
    );
  }
}

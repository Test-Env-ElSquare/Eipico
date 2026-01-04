import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  EnergyRefactor,
  GetFillerRefactor,
  Historical,
  JobOrderDetails,
  JobOrderMatairal,
  skus,
  timeline,
  fillers,
} from '../models/model';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class HistoricalDashboardService {
  dashboardTime = new EventEmitter();
  public duration: BehaviorSubject<number>;
  public currentDurationValue: Observable<number>;
  public hubConnection: signalR.HubConnection;

  // Add BehaviorSubject for filler data to share SignalR updates
  public fillerData$ = new BehaviorSubject<fillers | null>(null);

  private _factory: number;
  private _line: number;

  part?: number | boolean;
  filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  };

  constructor(private _http: HttpClient, private ngZone: NgZone) {
    this.duration = new BehaviorSubject<number>(
      JSON.parse(localStorage.getItem('duration')!)
    );
    this.currentDurationValue = this.duration.asObservable();
  }

  public get currentDuration(): number {
    return this.duration.value;
  }

  public setcurrentDuration(duration: number) {
    localStorage.setItem('duration', String(duration));
  }

  HistoricalDashobards(
    factoryId: number,
    lineId: number,
    duration: number
  ): Observable<Historical[]> {
    return this._http.get<Historical[]>(
      environment.url + 'api/Dashboards/HistoricalDashobards',
      {
        params: {
          factoryId: factoryId,
          lineId: lineId,
          duration: duration,
        },
      }
    );
  }

  JobOrderMatairal(jobid: string): Observable<JobOrderMatairal[]> {
    return this._http.get<JobOrderMatairal[]>(
      environment.url + 'api/Dashboards/JobOrderMatairal',
      {
        params: {
          jobid: jobid,
        },
      }
    );
  }

  JobOrderDetails(jobid: string): Observable<JobOrderDetails> {
    return this._http.get<JobOrderDetails>(
      environment.url + 'api/Dashboards/JobOrderDetails',
      {
        params: {
          jobid: jobid,
        },
      }
    );
  }

  public set factory(factory: number) {
    this._factory = factory;
  }

  public set line(line: number) {
    this._line = line;
  }

  public async startConnectionSignalR(filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  }) {
    if (!filterObj?.selectedFactory || !filterObj?.selectedLine) {
      console.error('selectedFactory or selectedLine undefined');
      return;
    }
    const groupName = `MainDashboard${filterObj.selectedFactory}${filterObj.selectedLine}`;

    if (this.hubConnection) {
      try {
        await this.hubConnection.stop();
      } catch (err) {
        console.error('Error stopping connection:', err);
      }
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://10.1.1.240:80/MES/mainDashboard', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      console.log('SignalR connection started');
      await this.hubConnection.invoke(
        'JoinGroup',
        groupName,
        parseInt(filterObj.selectedFactory.toString()),
        parseInt(filterObj.selectedLine.toString())
      );
      console.log('Joined group:', groupName);

      this.hubConnection.on(groupName, (data) => {
        this.ngZone.run(() => {
          this.part = data;
          // covert data to fillers type
          const fillerData: fillers = {
            count: data.results || 0,
            qreject: 0,
            availability: 0,
            performance: 0,
            quality: 0,
            oee: 0,
            avgSpeed: 0,
            total: data.results || 0,
            weightedavgspeed: 0,
            equevilantAVGSpeed: 0,
          };

          this.part = data.results;
          this.fillerData$.next(fillerData);
        });
      });
    } catch (err) {
      console.error('Error starting or joining SignalR', err);
    }
  }

  // Method to send fake data for testing

  getFillerRefactor(
    factoryId: number,
    lineId: number,
    duration: number,
    from: string = '',
    to: string = ''
  ): Observable<GetFillerRefactor[]> {
    if (from && to) {
      return this._http.get<GetFillerRefactor[]>(
        environment.url + 'api/Dashboards/GetFillerRefactor',
        {
          params: {
            factoryId: factoryId,
            lineId: lineId,
            duration: duration,
            from: from,
            to: to,
          },
        }
      );
    } else {
      return this._http.get<GetFillerRefactor[]>(
        environment.url + 'api/Dashboards/GetFillerRefactor',
        {
          params: {
            factoryId: factoryId,
            lineId: lineId,
            duration: duration,
          },
        }
      );
    }
  }

  EnergyRefactor(
    lineId: number,
    duration: number,
    from: string = '',
    to: string = ''
  ): Observable<EnergyRefactor> {
    if (from && to) {
      return this._http.get<EnergyRefactor>(
        environment.url + 'api/Dashboards/EnergyRefactor',
        {
          params: {
            lineId: lineId,
            duration: duration,
            from: from,
            to: to,
          },
        }
      );
    } else {
      return this._http.get<EnergyRefactor>(
        environment.url + 'api/Dashboards/EnergyRefactor',
        {
          params: {
            lineId: lineId,
            duration: duration,
          },
        }
      );
    }
  }

  TimeLineRefactor(
    lineId: number,
    duration: number,
    from: string = '',
    to: string = ''
  ): Observable<timeline[]> {
    if (from && to) {
      return this._http.get<timeline[]>(
        environment.url + 'api/Dashboards/TimeLineRefactor',
        {
          params: {
            lineId: lineId,
            duration: duration,
            from: from,
            to: to,
          },
        }
      );
    } else {
      return this._http.get<timeline[]>(
        environment.url + 'api/Dashboards/TimeLineRefactor',
        {
          params: {
            lineId: lineId,
            duration: duration,
          },
        }
      );
    }
  }

  GetSkus(
    lineId: number,
    duration: number,
    from: string = '',
    to: string = ''
  ): Observable<skus[]> {
    return this._http.get<skus[]>(environment.url + 'api/Dashboards/GetSkus', {
      params: {
        lineId: lineId,
        duration: duration,
        from: from,
        to: to,
      },
    });
  }
}

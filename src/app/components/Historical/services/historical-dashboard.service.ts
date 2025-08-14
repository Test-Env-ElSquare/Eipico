import { EventEmitter, Injectable } from '@angular/core';
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

  constructor(private _http: HttpClient) {
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

  //get skus details by jobid
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

  // public startConnection = () => {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('http://10.1.1.240:80/MES/mainDashboard', {
  //       skipNegotiation: true,
  //       transport: signalR.HttpTransportType.WebSockets,
  //     })
  //     .withAutomaticReconnect()
  //     .configureLogging(signalR.LogLevel.Information)
  //     .build();
  //   this.hubConnection
  //     .start()
  //     .then(() => console.log('success conected'))
  //     .catch((err) => console.log('Error while starting connection: ' + err));
  // };
  public async startConnectionSignalR(filterObj: {
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: any;
    to?: any;
  }) {
    if (!filterObj?.selectedFactory || !filterObj?.selectedLine) {
      console.error(' selectedFactory selectedLine undefined');
      return;
    }

    const groupName = `MainDashboard${filterObj.selectedFactory}${filterObj.selectedLine}`;

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
      console.log('✅ Joined group:', groupName);

      this.hubConnection.on(groupName, (data) => {
        this.part = data;
        console.log(' Received data:', data);
      });
    } catch (err) {
      console.error(' Error while starting connection or joining group: ', err);
    }
  }

  // startConnection() {
  //   this.hubConnection.on(
  //     `MainDashboard${this.filterObj.selectedFactory}${this.filterObj.selectedLine}`,
  //     (data) => {
  //       this.part = data;
  //       console.log(data);
  //     }
  //   );
  // }
  ////////refactoring from backend
  getFillerRefactor(
    factoryId: number,
    lineId: number,
    duration: number,
    from: string = '',
    to: string = ''
  ): Observable<GetFillerRefactor[]> {
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
  }

  EnergyRefactor(
    lineId: number,
    duration: number,
    from: string = '',
    to: string = ''
  ): Observable<EnergyRefactor> {
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
  }

  TimeLineRefactor(
    lineId: number,
    duration: number,
    from: string = '',
    to: string = ''
  ): Observable<timeline[]> {
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

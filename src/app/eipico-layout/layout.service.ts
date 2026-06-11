import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public hubConnection!: signalR.HubConnection;
  public scaleHubConnection!: signalR.HubConnection;
  constructor() {}

  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://10.1.1.240/Eipico/signalsHub', {
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    return this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started');
      })
      .catch((err) => {
        console.error('Error while starting connection: ', err);
        throw err;
      });
  }

  public startScaleStatusConnection(factoryId: number): Promise<void> {
    this.scaleHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://10.1.1.240/MES/hubs/scaleStatus?factoryId=${factoryId}`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    return this.scaleHubConnection
      .start()
      .then(() => {
        console.log('Scale status SignalR connection started');
      })
      .catch((err) => {
        console.error('Error while starting scale status SignalR connection: ', err);
        throw err;
      });
  }

  public onInitialScales(callback: (data: any[]) => void): void {
    this.scaleHubConnection.on('InitialScales', (data: any[]) => {
      callback(data);
    });
  }

  public onScaleUpdate(callback: (data: any) => void): void {
    this.scaleHubConnection.on('ReceiveScaleUpdate', (data: any) => {
      callback(data);
    });
  }

  public onAllMachineUpdate(callback: (data: any) => void): void {
    this.hubConnection.on('ReceiveFactorySignals', (data: any) => {
      callback(data);
    });
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log(' SignalR connection stopped'))
        .catch((err) =>
          console.log(' Error while stopping SignalR connection: ', err),
        );
    }
  }

  public stopScaleStatusConnection() {
    if (this.scaleHubConnection) {
      this.scaleHubConnection
        .stop()
        .then(() => console.log('Scale status SignalR connection stopped'))
        .catch((err) =>
          console.log('Error while stopping scale status SignalR connection: ', err),
        );
    }
  }
}

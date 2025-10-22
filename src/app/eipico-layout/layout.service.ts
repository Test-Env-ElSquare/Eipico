import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public hubConnection!: signalR.HubConnection;
  constructor() {}
  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://192.168.1.25:21576/signalsHub', {
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
          console.log(' Error while stopping SignalR connection: ', err)
        );
    }
  }
}

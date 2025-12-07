import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalREnergyService {
  public hubConnection!: signalR.HubConnection;
  tranformerRead: any[] = [];
  constructor() {}
  startConnection(sourceId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://10.1.1.240:80/eipico/transformerHub?sourceId=${sourceId}`
      )
      .withAutomaticReconnect()
      .build();

    return this.hubConnection.start().then(() => {
      console.log('SignalR connected');

      return this.hubConnection.invoke('JoinSource', sourceId);
    });
  }

  energyUpdate(callback: (data: any) => void) {
    this.hubConnection.on('ReceiveIsolationValveData', (data) => {
      callback(data);
    });
  }

  stopConnection(): void {
    this.hubConnection?.stop().then(() => console.log('SignalR Stopped'));
  }
}

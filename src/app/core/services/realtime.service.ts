import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; // or from "@microsoft/signalr" if you are using a new library

@Injectable({
  providedIn: 'root',
})
export class Realtime {
  constructor() {}
  public hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://cocafda.tccbce.com:80/backapp/LineDetails', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)

      // .configureLogging(signalR.LogLevel.Information)

      .build();
    this.hubConnection
      .start()
      .then()
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
}

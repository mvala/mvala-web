import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ServerInfoService {

  constructor() { }

  private url: string = window.location.protocol + '//' +
  window.location.hostname + ':' + window.location.port;
  private socket;

  getInfo() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('app.info', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}

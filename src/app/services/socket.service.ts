import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket = io('http://localhost:5000');
  constructor() {}
  sendBus(bus: string) {
    this.socket.emit('bus', bus);
  }

  onBusActualizado(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('bus_actualizado', (data) => {
        observer.next(data);
      });
    });
  }
}

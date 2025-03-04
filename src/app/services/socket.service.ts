import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Bus } from '../interfaces/bus';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket = io('http://localhost:5001');
  constructor() {}
  sendBus(bus: Bus) {
    this.socket.emit('bus', bus);
  }

  onBusActualizado(): Observable<Bus> {
    return new Observable((observer) => {
      this.socket.on('bus_actualizado', (data: Bus) => {
        observer.next(data);
      });
    });
  }
}

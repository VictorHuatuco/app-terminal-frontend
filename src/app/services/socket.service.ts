import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

interface Bus {
  company: '';
  travelRoute: '';
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket = io('http://localhost:5000');
  constructor() {}
  sendBus(bus: Bus) {
    console.log(bus);
    this.socket.emit('bus', JSON.stringify(bus));
  }

  onBusActualizado(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('bus_actualizado', (data) => {
        observer.next(data);
      });
    });
  }
}

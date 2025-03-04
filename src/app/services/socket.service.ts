import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Bus } from '../interfaces/bus';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private readonly SOCKET_URL = `http://${window.location.hostname}:5001`; // Usa la IP dinámica

  constructor() {
    this.socket = io(this.SOCKET_URL);
  }

  sendBus(bus: Bus) {
    this.socket.emit('bus', bus);
  }

  onBusActualizado(): Observable<Bus> {
    return new Observable((observer) => {
      this.socket.on('bus_actualizado', (data: Bus) => {
        observer.next(data);
      });

      return () => {
        this.socket.off('bus_actualizado'); // Limpia la suscripción
      };
    });
  }
}

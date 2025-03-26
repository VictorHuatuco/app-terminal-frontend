import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Bus } from '../interfaces/bus';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private messagesSubject = new Subject<any>();
  private readonly SOCKET_URL = 'http://localhost:8000';

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket = io(this.SOCKET_URL);

    this.socket.on('message', (data) => {
      this.messagesSubject.next(data);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.io Error:', error);
    });

    this.socket.on('disconnect', () => {
      console.warn('Socket.io desconectado. Intentando reconectar...');
    });
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }
}

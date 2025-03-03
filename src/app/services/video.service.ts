import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private socket: Socket;
  private backendUrl = 'http://localhost:5000'; // URL del backend Flask

  constructor() {
    // Conectar con el backend usando Socket.IO
    this.socket = io(this.backendUrl);
  }

  // Solicita la lista de videos al backend
  requestVideos(): void {
    this.socket.emit('get_videos');
  }

  // Escucha el evento 'videos_list' para recibir los videos
  onVideosReceived(callback: (videos: string[]) => void): void {
    this.socket.on('videos_list', (data: { videos: string[] }) => {
      callback(data.videos);
    });
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent {
  videos: string[] = [];
  currentVideo: string = '';
  videoIndex: number = 0;
  userInteracted: boolean = false;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
    this.videoService.onVideosReceived((videos) => {
      this.videos = videos;
      if (this.videos.length > 0) {
        this.playVideo(true); // Primera vez en mute
      }
    });

    // Detecta cualquier clic en la página para activar el sonido
    document.addEventListener('click', () => {
      if (!this.userInteracted) {
        this.userInteracted = true;
        this.enableSound();
      }
    });
  }

  loadVideos(): void {
    this.videoService.requestVideos();
  }

  playVideo(mute: boolean = false): void {
    if (this.videos.length === 0) return;

    const nextVideo = this.videos[this.videoIndex];
    const videoElement = document.getElementById(
      'videoPlayer'
    ) as HTMLVideoElement;

    if (videoElement) {
      // Crear un nuevo elemento video en memoria para pre-cargar
      const preloadedVideo = document.createElement('video');
      preloadedVideo.src = nextVideo;
      preloadedVideo.muted = mute;
      preloadedVideo.preload = 'auto'; // Se carga en segundo plano

      preloadedVideo.oncanplaythrough = () => {
        videoElement.src = nextVideo; // Solo cambiamos cuando ya está listo
        videoElement.muted = mute;
        videoElement.play();
      };

      videoElement.onended = () => {
        this.videoIndex = (this.videoIndex + 1) % this.videos.length;
        this.playVideo(this.userInteracted ? false : true);
      };
    }
  }

  enableSound(): void {
    const videoElement = document.getElementById(
      'videoPlayer'
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = false; // Activamos el sonido
      videoElement.play(); // Nos aseguramos de que siga reproduciendo
    }
  }
}

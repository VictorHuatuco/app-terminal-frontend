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
  // videos: string[] = [];
  // currentVideo: string = '';
  // videoIndex: number = 0;
  // isPlaying: boolean = false;
  // @ViewChild('videoPlayer', { static: false })
  // videoPlayer!: ElementRef<HTMLVideoElement>;
  // constructor(private videoService: VideoService) {}
  // ngOnInit(): void {
  //   this.loadVideos();
  //   this.videoService.onVideosReceived((videos) => {
  //     this.videos = videos;
  //   });
  // }
  // loadVideos(): void {
  //   this.videoService.requestVideos();
  // }
  // startPlayback(): void {
  //   if (!this.isPlaying && this.videos.length > 0) {
  //     this.isPlaying = true;
  //     this.playVideo();
  //   }
  // }
  // playVideo(): void {
  //   if (this.videos.length === 0 || !this.videoPlayer) return;
  //   this.currentVideo = this.videos[this.videoIndex];
  //   const videoElement = this.videoPlayer.nativeElement;
  //   videoElement.src = this.currentVideo;
  //   videoElement.load();
  //   videoElement
  //     .play()
  //     .then(() => {
  //       console.log('Reproduciendo:', this.currentVideo);
  //     })
  //     .catch((error: any) => {
  //       console.error('Error al reproducir el video:', error);
  //     });
  //   videoElement.onended = () => {
  //     this.videoIndex = (this.videoIndex + 1) % this.videos.length;
  //     this.playVideo();
  //   };
  // }

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

    this.currentVideo = this.videos[this.videoIndex];

    const videoElement = document.getElementById(
      'videoPlayer'
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.src = this.currentVideo; // Asignamos la fuente del video
      videoElement.muted = mute; // Primera reproducción en mute
      videoElement.load();
      videoElement
        .play()
        .then(() => {
          console.log('Reproduciendo:', this.currentVideo);
        })
        .catch((error) => {
          console.error('Error al reproducir el video:', error);
        });

      videoElement.onended = () => {
        this.videoIndex = (this.videoIndex + 1) % this.videos.length;
        this.playVideo(this.userInteracted ? false : true); // Si el usuario ya interactuó, desmuteamos
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

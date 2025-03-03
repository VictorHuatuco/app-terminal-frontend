import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { VideoComponent } from '../video/video.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, VideoComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {
  allBus: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onBusActualizado().subscribe((data) => {
      console.log(data);
      const bus = JSON.parse(data);
      console.log({ bus });
      const busInformation = `📦 Bus arrivado - Empresa: ${bus.company}, Ruta: ${bus.travelRoute}`;
      this.allBus.push(busInformation);
    });
  }
}

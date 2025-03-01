import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {
  allBus: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onBusActualizado().subscribe((bus) => {
      this.allBus.push(bus);
    });
  }

  actualizarPedido(): void {
    this.socketService.sendBus('Nuevo bus recibido');
  }
}

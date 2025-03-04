import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { VideoComponent } from '../video/video.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Bus } from '../../interfaces/bus';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, VideoComponent, MatTableModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {
  public displayedColumns: string[] = [
    'Empresa',
    'Destino',
    'Hora',
    'Embarque',
  ];
  public dataOnArrivingBuses = new MatTableDataSource<Bus>([
    {
      id: '22',
      company: 'Cruz del Sur',
      destination: 'Huancavelica',
      arrivalTime: '15:00',
      boardingGate: '23',
    },
    {
      id: '22',
      company: 'Cruz del Sur',
      destination: 'Huancavelica',
      arrivalTime: '15:00',
      boardingGate: '23',
    },
  ]);
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onBusActualizado().subscribe((data) => {
      console.log('data por mostrar', data);
      this.dataOnArrivingBuses.data = [...this.dataOnArrivingBuses.data, data];
    });
  }
}

// const bus = JSON.parse(data);
// console.log({ bus });
// const busInformation = `📦 Bus arrivado - Empresa: ${bus.company}, Ruta: ${bus.travelRoute}`;

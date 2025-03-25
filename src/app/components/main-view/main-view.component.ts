import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { VideoComponent } from '../video/video.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Bus } from '../../interfaces/bus';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, VideoComponent, MatTableModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent implements OnInit {
  currentTime$!: Observable<string>;
  currentDate$!: Observable<string>;
  public displayedColumns: string[] = [
    'Empresa',
    'Destino',
    'Hora',
    'Embarque',
    'Observación',
  ];
  public dataOnArrivingBuses = new MatTableDataSource<Bus>([
    {
      id: '22',
      company: 'Cruz del Sur',
      destination: 'Huancavelica',
      arrivalTime: '15:00',
      boarding_gate: '23',
      observation: 'Cancelado',
    },
    {
      id: '22',
      company: 'Cruz del Sur',
      destination: 'Huancavelica',
      arrivalTime: '15:00',
      boarding_gate: '23',
      observation: 'Atrasado',
    },
  ]);
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.subscribeToBusUpdates();
    this.currentTime$ = this.getCurrentTime();
    this.currentDate$ = this.getCurrentDate();
  }

  private subscribeToBusUpdates() {
    this.socketService.onBusActualizado().subscribe((data) => {
      console.log('data por mostrar', data);
      this.dataOnArrivingBuses.data = [...this.dataOnArrivingBuses.data, data];
    });
  }
  private getCurrentTime(): Observable<string> {
    return interval(1000).pipe(map(() => new Date().toLocaleTimeString()));
  }

  private getCurrentDate(): Observable<string> {
    return interval(1000).pipe(
      map(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long', // Nombre del día (jueves)
          day: '2-digit', // Día (27)
          month: 'short', // Mes en formato corto (feb.)
        };

        // Formatear fecha en español, convertir a mayúsculas y eliminar la coma
        return date
          .toLocaleDateString('es-PE', options)
          .toUpperCase()
          .replace(',', '')
          .replace('.', '');
      })
    );
  }
}

// const bus = JSON.parse(data);
// console.log({ bus });
// const busInformation = `📦 Bus arrivado - Empresa: ${bus.company}, Ruta: ${bus.travelRoute}`;

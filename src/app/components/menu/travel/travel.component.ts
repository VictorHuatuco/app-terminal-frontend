import { Component, OnInit } from '@angular/core';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../../services/navigation.service';
import { TravelsService } from '../../../services/travels.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, MatButtonModule],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
})
export class TravelComponent implements OnInit {
  public travelsData = [
    {
      id: 1,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departure_time: '15:00',
    },
  ];

  constructor(
    private navigation: NavigationService,
    private travelsService: TravelsService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private snackbarService: SnackbarService
  ) {}
  public handleRedirection(text: string): void {
    this.navigation.onTravelsNav(text);
  }

  ngOnInit(): void {
    this.getTravels();
  }

  getTravels() {
    this.travelsService.getTravels().subscribe({
      next: (response) => {
        console.log('lista viajes', response);
        this.travelsData = response.map((item: any) => ({
          id: item.id,
          company: item.bus_company.bus_company,
          destination: item.destination.destination,
          departure_time: item.departure_time.slice(0, 5),
        }));
      },
      error: (error) => {
        console.error('Error', error.error);
      },
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['menu/travels/edit/' + id]);
  }

  onDelete(id: number): void {
    const dialogData = {
      title: '',
      message: `¿Está seguro de eliminarlo?`,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    };

    this.confirmDialogService.confirm(dialogData).subscribe({
      next: (response) => {
        if (response) {
          this.travelsService.deleteTravel(id).subscribe({
            next: (response) => {
              console.log('response del delete', response);
              this.snackbarService.show('Ruta eliminada', 'success');
              this.getTravels();
            },
            error: (error) => {
              this.snackbarService.show('Ocurrió un error', 'error');
            },
          });

          // this.navigation.onMainMenuNav('Rutas de viaje');
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

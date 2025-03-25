import { Component, OnInit } from '@angular/core';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { CommonModule } from '@angular/common';
import { Announcement } from '../../../interfaces/announcement';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { AnnouncementService } from '../../../services/announcement.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, MatButtonModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent implements OnInit {
  public announcementsData: Announcement[] = [
    {
      id: 1,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departure_time: '15:00',
      observation: 'Atrasado',
    },
  ];

  constructor(
    private navigation: NavigationService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private announcementService: AnnouncementService,
    private snackbarService: SnackbarService
  ) {}
  public handleRedirection(text: string): void {
    this.navigation.onAnnouncementNav(text);
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe({
      next: (response) => {
        console.log('lista anuncios', response);
        const obs: { [key: string]: string } = {
          delayed: 'atrasado',
          canceled: 'cancelado',
          arrived: 'arrivado',
        };
        this.announcementsData = response.map((item: any) => ({
          id: item.id,
          company: item.travel.bus_company.bus_company,
          destination: item.travel.destination.destination,
          departure_time: item.travel.departure_time.slice(0, 5),
          observation: obs[item.observation],
          boarding_gate: item.boarding_gate?.boarding_gate,
        }));
      },
      error: (error) => {
        console.error('Error', error.error);
      },
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['menu/announcements/edit/' + id]);
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
          this.announcementService.deleteAnnouncement(id, false).subscribe({
            next: (response) => {
              console.log('response del delete', response);
              this.snackbarService.show('Anuncio eliminado', 'success');
              this.getAnnouncements();
            },
            error: (error) => {
              this.snackbarService.show('Ocurrió un error', 'error');
            },
          });

          this.navigation.onMainMenuNav('Anuncios');
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

import { Component } from '@angular/core';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { CommonModule } from '@angular/common';
import { Announcement } from '../../../interfaces/announcement';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, MatButtonModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent {
  public announcementsData: Announcement[] = [
    {
      id: 1,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: 2,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      boardingGate: '23',
      observation: 'Disponible',
    },
    {
      id: 3,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Cancelado',
    },
    {
      id: 4,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: 5,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: 6,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: 7,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
  ];

  constructor(
    private navigation: NavigationService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService
  ) {}
  public handleRedirection(text: string): void {
    this.navigation.onAnnouncementNav(text);
  }

  onEdit(id: number): void {
    this.router.navigate(['menu/announcements/edit/' + id]);
  }

  onDelete(id: number): void {
    // this.enterpriseService.deleteEnterprise(id).subscribe(() => {
    //   this.list();
    // });

    const dialogData = {
      title: '',
      message: `¿Está seguro de eliminarlo?`,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    };

    this.confirmDialogService.confirm(dialogData).subscribe((result) => {
      if (result) {
        // if (localStorage.getItem(AppConstants.Storage.ENTERPRISE)) {
        // this.authService.logout();
        this.navigation.onAnnouncementNav('Anuncios');
        // } else {
        // this.authService.logout();
        // this.router.navigate(['briq']);}
      }
    });
  }
}

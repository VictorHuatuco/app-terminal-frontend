import { Component } from '@angular/core';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { CommonModule } from '@angular/common';
import { Announcement } from '../../../interfaces/announcement';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';

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
      id: '',
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: '',
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      boardingGate: '23',
      observation: 'Disponible',
    },
    {
      id: '',
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Cancelado',
    },
    {
      id: '',
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: '',
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: '',
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
    {
      id: '',
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: 'Atrasado',
    },
  ];

  constructor(private navigation: NavigationService) {}
  public handleRedirection(text: string): void {
    this.navigation.onAnnouncementNav(text);
  }
}

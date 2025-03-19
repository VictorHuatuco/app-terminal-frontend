import { Component } from '@angular/core';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, MatButtonModule],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
})
export class TravelComponent {
  public travelsData = [
    {
      id: 1,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
    },
    {
      id: 2,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
    },
    {
      id: 3,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
    },
    {
      id: 4,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
    },
    {
      id: 5,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
    },
    {
      id: 6,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
    },
    {
      id: 7,
      company: 'Cruz del Sur',
      destination: 'Lima-Tacna',
      departureTime: '15:00',
      observation: '--',
    },
  ];

  constructor(private navigation: NavigationService) {}
  public handleRedirection(text: string): void {
    this.navigation.onTravelsNav(text);
  }
}

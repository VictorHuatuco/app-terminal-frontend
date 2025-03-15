import { Component, Input } from '@angular/core';
import { Announcement } from '../../../interfaces/announcement';
import { CommonModule } from '@angular/common';

interface Data {
  company: string;
  destination: string;
  departureTime: string;
  boardingGate?: string;
  observation?: string;
}

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input() public data: Data = {
    company: 'Cruz del Sur',
    destination: 'Tacna',
    departureTime: '15:00',
    boardingGate: '23',
    observation: 'Atrasado',
  };
}

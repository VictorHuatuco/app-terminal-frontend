import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss',
})
export class MenuViewComponent {
  public buttonsData = [
    { icon: 'fa-solid fa-tv', img: '', text: 'Anuncios' },
    { icon: 'fa-solid fa-van-shuttle', img: '', text: 'Rutas de viaje' },
    { icon: 'fa-solid fa-play', img: '', text: 'Publicidad' },
  ];

  constructor(private navigation: NavigationService) {}
  public redirectToPage(buttonText: string) {
    this.navigation.onMainMenuNav(buttonText);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  public onMainMenuNav(text: string) {
    const routes: { [key: string]: string } = {
      Anuncios: 'menu/announcements',
      'Rutas de viaje': 'menu/travels',
      Publicidad: 'menu/ads',
    };
    this.router.navigate([routes[text] || 'menu/announcements']);
  }

  public onAnnouncementNav(text: string) {
    const routes: { [key: string]: string } = {
      Agregar: 'menu/announcements/new',
      Editar: 'menu/announcements/edit',
      // Eliminar: 'menu/announcements',
    };
    this.router.navigate([routes[text] || 'menu/announcements']);
  }

  public onTravelsNav(text: string) {
    const routes: { [key: string]: string } = {
      Agregar: 'menu/travels/new-bus',
      Editar: 'menu/travels/edit',
      // Eliminar: 'menu/announcements',
    };
    this.router.navigate([routes[text] || 'menu/travels']);
  }
}

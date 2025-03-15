import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NavigationBtnsComponent } from '../../shared/components/navigation-btns/navigation-btns.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterOutlet,
    NavbarComponent,
    NavigationBtnsComponent,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public showNavigationBtns = true;
  private hiddenRoutes: string[] = ['/menu']; // Rutas donde NO se muestra
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNavigationBtns = !this.hiddenRoutes.includes(this.router.url);
    });
  }
}

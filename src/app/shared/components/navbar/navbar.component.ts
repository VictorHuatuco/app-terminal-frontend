import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenu,
    MatMenuModule,
    MatMenuTrigger,
    MatToolbarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navbarTitle!: string;
  // @Output() toggleSidenav = new EventEmitter<void>();
  name: String;
  // photo: String;
  role: String;
  isSidenavOpen: boolean = false;
  isMobileView!: boolean;
  constructor(
    // private authService: AuthService,
    private router: Router, // private navbarService: NavbarService,
    private confirmDialogService: ConfirmDialogService
  ) {
    // this.name = localStorage.getItem('name')?.toString()!;
    // this.photo = localStorage.getItem('photo')?.toString()!;
    // this.role = localStorage.getItem('role')?.toString()!;
    this.name = 'Administración Terminal';
    this.role = 'admin';
    this.checkViewport();
  }

  ngOnInit(): void {
    // this.navbarService.currentTitle.subscribe((title) => {
    //   this.navbarTitle = title;
    // });
  }

  profile() {
    //this.router.navigate(['/home/admin/user/profile']);
  }

  notifications() {
    // this.router.navigate(['/home/notification']);
  }

  logout() {
    const dialogData = {
      title: '',
      message: `¿Está seguro de cerrar sesión?`,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    };

    this.confirmDialogService.confirm(dialogData).subscribe((result) => {
      if (result) {
        // if (localStorage.getItem(AppConstants.Storage.ENTERPRISE)) {
        // this.authService.logout();
        this.router.navigate(['']);
        // } else {
        // this.authService.logout();
        // this.router.navigate(['briq']);}
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 600;
  }
}

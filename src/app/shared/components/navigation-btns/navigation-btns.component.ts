import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-btns',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './navigation-btns.component.html',
  styleUrl: './navigation-btns.component.scss',
})
export class NavigationBtnsComponent implements OnInit {
  activeButton!: string;

  constructor(private navigation: NavigationService) {}

  handleRedirection(text: string): void {
    this.activeButton = text;
    this.navigation.setActiveButton(text);
    this.navigation.onMainMenuNav(text);
  }

  ngOnInit(): void {
    this.activeButton = this.navigation.getActiveButton();
  }
}

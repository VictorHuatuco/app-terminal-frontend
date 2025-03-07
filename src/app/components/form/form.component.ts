import { Component } from '@angular/core';
import { NewBusComponent } from './new-bus/new-bus.component';
import { RecordBusArrivalComponent } from './record-bus-arrival/record-bus-arrival.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  constructor(private router: Router) {}
  public redirectToArrivalBus() {
    this.router.navigate(['record-bus-arrival']);
  }

  public redirectToRegisterBus() {
    this.router.navigate(['new-bus']);
  }
}

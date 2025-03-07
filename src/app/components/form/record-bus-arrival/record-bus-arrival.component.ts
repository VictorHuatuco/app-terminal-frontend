import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SocketService } from '../../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-bus-arrival',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './record-bus-arrival.component.html',
  styleUrl: './record-bus-arrival.component.scss',
})
export class RecordBusArrivalComponent {
  public busData: FormGroup = new FormGroup({
    company: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    boardingGate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.busData.valueChanges.subscribe(() => {
      // console.log(this.busData.value);
    });
  }
  constructor(private socketService: SocketService, private router: Router) {}
  onAddBus(): void {
    this.socketService.sendBus(this.busData.value);
    this.clearForm();
  }

  clearForm() {
    this.busData.reset();
  }
  onCancel(): void {
    this.router.navigate(['form']);
  }
}

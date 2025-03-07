import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SocketService } from '../../../services/socket.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-new-bus',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './new-bus.component.html',
  styleUrl: './new-bus.component.scss',
})
export class NewBusComponent {
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
  constructor(
    private socketService: SocketService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
  onSubmit(): void {
    if (this.busData.invalid) {
      this.busData.markAllAsTouched();
      this.snackbarService.show(
        'Complete los campos necesarios antes de continuar.',
        'error'
      );
      return;
    }

    // this.busService.createEnterprise(busData).subscribe({
    //   next: (response) => {
    //     if (response.code == 200) {
    this.onRedirectToMenu();
    this.snackbarService.show('Guardado exitosamente', 'success');
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error token', error.error);
    //     this.snackbarService.show(
    //       'Ocurrió un error al guardar la información. Inténtelo de nuevo.',
    //       'error'
    //     );
    //   },
    // });

    this.socketService.sendBus(this.busData.value);
    this.clearForm();
  }

  onRedirectToMenu(): void {
    this.router.navigate(['form']);
  }

  clearForm() {
    this.busData.reset();
  }
}

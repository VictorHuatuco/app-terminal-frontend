import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { SocketService } from '../../../../services/socket.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-new-bus',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    FormComponent,
  ],
  templateUrl: './new-bus.component.html',
  styleUrl: './new-bus.component.scss',
})
export class NewBusComponent {
  public formFields = [
    {
      label: 'Empresa de transporte',
      formControl: 'busCompany',
      type: 'select',
      options: [
        {
          value: '',
          label: '',
        },
      ],
      validators: 'required',
    },
    {
      label: 'Destino',
      formControl: 'destinations',
      type: 'select',
      options: [
        {
          value: '',
          label: '',
        },
      ],
      validators: 'required',
    },
    {
      label: 'Hora de partida',
      formControl: 'departureTime',
      type: 'select',
      options: [
        {
          value: '',
          label: '',
        },
      ],
      validators: 'required',
    },
  ];

  public buttonsData = [
    { text: 'Crear ruta', type: 'submit' },
    { text: 'Cancelar', type: 'button' },
  ];

  onSubmit(data: any): void {
    console.log('llego la data del form', data);
  }

  constructor(
    private socketService: SocketService,
    private router: Router,
    private snackbarService: SnackbarService,
    private navigation: NavigationService
  ) {}
  // onSubmit(): void {
  //   if (this.busData.invalid) {
  //     this.busData.markAllAsTouched();
  //     this.snackbarService.show(
  //       'Complete los campos necesarios antes de continuar.',
  //       'error'
  //     );
  //     return;
  //   }
  //   // this.busService.createEnterprise(busData).subscribe({
  //   //   next: (response) => {
  //   //     if (response.code == 200) {
  //   this.onRedirectToMenu();
  //   this.snackbarService.show('Guardado exitosamente', 'success');
  //   //     }
  //   //   },
  //   //   error: (error) => {
  //   //     console.error('Error token', error.error);
  //   //     this.snackbarService.show(
  //   //       'Ocurrió un error al guardar la información. Inténtelo de nuevo.',
  //   //       'error'
  //   //     );
  //   //   },
  //   // });
  //   this.socketService.sendBus(this.busData.value);
  //   this.clearForm();
  // }
  onCancel($event: string): void {
    this.navigation.onMainMenuNav('Rutas de viaje');
  }
  // clearForm() {
  //   this.busData.reset();
  // }
}

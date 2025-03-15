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
import { SocketService } from '../../../../services/socket.service';
import { Router } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { SnackbarService } from '../../../../services/snackbar.service';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-record-bus-observation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    FormComponent,
  ],
  templateUrl: './record-bus-obs.component.html',
  styleUrl: './record-bus-obs.component.scss',
})
export class RecordBusObservationComponent {
  public formFields = [
    {
      label: 'Listado de viajes disponibles',
      formControl: 'travels',
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
      label: 'Puerta de abordaje',
      formControl: 'boardingGate',
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
      label: 'Observación',
      formControl: 'observation',
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
    { text: 'Anunciar', type: 'submit' },
    { text: 'Cancelar', type: 'button' },
  ];
  public isLoading = false;
  ngOnInit() {
    // this.busData.valueChanges.subscribe(() => {
    //   // console.log(this.busData.value);
    // });
  }
  constructor(
    private socketService: SocketService,
    private navigation: NavigationService,
    private snackbarService: SnackbarService
  ) {}
  onSubmit($event: FormGroup): void {
    const formData = $event.value;
    // this.socketService.sendBus(this.busData.value);
    if (this.isLoading) return;
    this.isLoading = true;
    if (formData.invalid) {
      formData.markAllAsTouched();
      this.snackbarService.show(
        'Complete los campos necesarios antes de continuar.',
        'error'
      );
      this.isLoading = false;
      return;
    }
    this.clearForm();
  }

  clearForm() {
    // this.busData.reset();
  }
  onCancel($event: string): void {
    // this.router.navigate(['form']);
    this.navigation.onMainMenuNav('Anuncios');
  }
}

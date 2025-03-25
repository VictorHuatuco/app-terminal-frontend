import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { SocketService } from '../../../../services/socket.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { NavigationService } from '../../../../services/navigation.service';
import { BusCompaniesService } from '../../../../services/bus-companies.service';
import { DestinationService } from '../../../../services/destination.service';
import { TravelsService } from '../../../../services/travels.service';

interface Field {
  label: string;
  formControl: string;
  type: string;
  options: { value: string; label: string }[];
  validators?: string;
}

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
export class NewBusComponent implements OnInit {
  public busCompanies = [];
  public destinations = [];
  public isLoading = false;
  public isEditMode: boolean = false;
  public title: string = '';
  public id!: number;
  public formDataInitialValues: any = {};

  public formFields = [
    {
      label: 'Empresa de transporte',
      formControl: 'bus_company',
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
      formControl: 'destination',
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
      formControl: 'departure_time',
      type: 'select',
      options: [
        {
          value: '',
          label: '',
        },
      ],
      // validators: 'required',
    },
  ];

  public buttonsData: { text: string; type: string }[] = [];
  constructor(
    // private socketService: SocketService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private navigation: NavigationService,
    private busCompaniesService: BusCompaniesService,
    private destinationService: DestinationService,
    private travelsService: TravelsService
  ) {}
  ngOnInit(): void {
    this.getBusCompanies();
    this.getDestinations();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.isEditMode = true;
        this.title = 'Editar ruta de viaje';
        this.buttonsData = [
          { text: 'Actualizar viaje', type: 'submit' },
          { text: 'Cancelar', type: 'button' },
        ];
        // implementar endpoint para obtener el announcement
        this.travelsService.getById(this.id).subscribe({
          next: (response) => {
            console.log('respuesta get by id', response);
            if (!response) {
              this.navigation.onMainMenuNav('Rutas de viaje');
            }
            this.formDataInitialValues = {
              bus_company: response.id_bus_companies,
              destination: response.id_destinations,
              departure_time: response.departure_time,
            };
            console.log(this.formDataInitialValues);
          },
        });
      } else {
        this.title = 'Crear nueva ruta de viaje';
        this.buttonsData = [
          { text: 'Crear ruta', type: 'submit' },
          { text: 'Cancelar', type: 'button' },
        ];
      }
    });
  }

  getBusCompanies() {
    this.busCompaniesService.getBusCompanies().subscribe({
      next: (response) => {
        console.log('lista buses', response);
        this.busCompanies = response.map((item: any) => ({
          value: item.id,
          label: item.bus_company,
        }));
        this.formFields = this.formFields.map((field: Field) =>
          field.formControl === 'bus_company'
            ? { ...field, options: this.busCompanies }
            : field
        );
      },
      error: (error) => {
        console.error('Error', error.error);
      },
    });
  }

  getDestinations() {
    this.destinationService.getDestinations().subscribe({
      next: (response) => {
        console.log('lista destinos', response);
        this.destinations = response.map((item: any) => ({
          value: item.id,
          label: item.destination,
        }));
        this.formFields = this.formFields.map((field: Field) =>
          field.formControl === 'destination'
            ? { ...field, options: this.destinations }
            : field
        );
      },
      error: (error) => {
        console.error('Error', error.error);
      },
    });
  }

  onSubmit(form: FormGroup): void {
    if (this.isLoading) return;
    this.isLoading = true;
    if (form.invalid) {
      form.markAllAsTouched();
      this.snackbarService.show(
        'Complete los campos necesarios antes de continuar.',
        'error'
      );
      this.isLoading = false;
      return;
    }
    const data = {
      id_bus_companies: form.value.bus_company,
      id_destinations: form.value.destination,
      departure_time: '08:30:00',
      // departure_time: form.value.departure_time,
      plate: ' ',
    };

    if (this.isEditMode) {
      this.travelsService.updateTravel(data, this.id).subscribe({
        next: (response) => {
          console.log('respuesta del update', response);
          if (response) {
            this.navigation.onMainMenuNav('Rutas de viaje');
            this.snackbarService.show('Actualizado exitosamente', 'success');
          }
        },
        error: (error) => {
          console.error(error);
          this.snackbarService.show(
            'Ocurrió un error al actualizar la información. Inténtelo de nuevo.',
            'error'
          );
          this.isLoading = false;
        },
      });
    } else {
      // Aquí iría la lógica para enviar al backend
      this.travelsService.createTravel(data).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.snackbarService.show('Guardado exitosamente', 'success');
            this.navigation.onMainMenuNav('Rutas de viaje');
          }
        },
        error: (error) => {
          console.error(error);
          this.snackbarService.show(
            'Ocurrió un error al enviar los datos',
            'error'
          );
          this.isLoading = false;
        },
      });
    }
  }

  onCancel($event: string): void {
    this.navigation.onMainMenuNav('Rutas de viaje');
  }
  // clearForm() {
  //   this.busData.reset();
  // }
}

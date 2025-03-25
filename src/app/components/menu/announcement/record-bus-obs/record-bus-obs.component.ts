import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormComponent } from '../../../../shared/components/form/form.component';
import { SnackbarService } from '../../../../services/snackbar.service';
import { NavigationService } from '../../../../services/navigation.service';
import { AnnouncementService } from '../../../../services/announcement.service';
import { Announcement } from '../../../../interfaces/announcement';
import { TravelsService } from '../../../../services/travels.service';
import { DestinationService } from '../../../../services/destination.service';
import { BusCompaniesService } from '../../../../services/bus-companies.service';
import { BoardingGateService } from '../../../../services/boarding-gate.service';

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
export class RecordBusObservationComponent implements OnInit {
  public observations = [
    { value: 'canceled', label: 'cancelado' },
    { value: 'arrived', label: 'arrivado' },
    { value: 'delayed', label: 'atrasado' },
  ];
  public formFields = [
    {
      label: 'Listado de viajes disponibles',
      formControl: 'travel',
      type: 'select',
      options: [
        {
          value: '',
          label: '',
        },
      ],
      validators: 'required',
      disabled: false,
    },
    {
      label: 'Observación',
      formControl: 'observation',
      type: 'select',
      options: this.observations,
      validators: 'required',
      disabled: false,
    },
    {
      label: 'Puerta de abordaje',
      formControl: 'boarding_gate',
      type: 'select',
      options: [
        {
          value: '',
          label: '',
        },
      ],
      disabled: true,
    },
  ];

  public buttonsData = [
    { text: 'Anunciar', type: 'submit' },
    { text: 'Cancelar', type: 'button' },
  ];
  public isLoading = false;
  public isEditMode: boolean = false;
  public title: string = '';
  public id: number = 0;
  public formDataInitialValues: any = {};

  ngOnInit(): void {
    this.getTravels();
    this.getBoardingGates();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.title = 'Editar estado del bus';
        this.id = params['id'];

        // implementar endpoint para obtener el announcement
        this.announcementService.getById(this.id).subscribe({
          next: (response) => {
            console.log('respuesta get by id', response);
            if (!response) {
              this.navigation.onMainMenuNav('Anuncios');
            }
            this.formDataInitialValues = {
              travel: response.id_travels,
              observation: response.observation,
              boarding_gate: response.id_boarding_gates,
            };
            console.log(this.formDataInitialValues);
          },
        });
      } else {
        this.title = 'Anunciar estado del bus';
      }
    });
  }
  constructor(
    private socketService: SocketService,
    private navigation: NavigationService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private travelsService: TravelsService, // private announcementService: AnnouncementService
    private destinationService: DestinationService,
    private busCompaniesService: BusCompaniesService,
    private announcementService: AnnouncementService,
    private boardingGateService: BoardingGateService
  ) {}

  getTravels() {
    this.travelsService.getTravels().subscribe({
      next: (response) => {
        console.log('lista viajes', response);
        const options = response.map((op: any) => ({
          value: op.id,
          label: `${op.bus_company.bus_company} - ${
            op.destination.destination
          } - ${op.departure_time.slice(0, 5)}`,
        }));

        this.formFields = this.formFields.map((field: any) =>
          field.formControl === 'travel'
            ? { ...field, options: options }
            : field
        );
        console.log(this.formFields);
      },
      error: (error) => {
        console.error('Error', error.error);
      },
    });
  }

  getBoardingGates() {
    this.boardingGateService.getBoardingGates().subscribe({
      next: (response) => {
        console.log(response);
        const boarding_gates = response.map((gate: any) => ({
          value: gate.id,
          label: gate.boarding_gate,
        }));

        this.formFields = this.formFields.map((field) =>
          field.formControl === 'boarding_gate'
            ? { ...field, options: boarding_gates }
            : field
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit(form: FormGroup): void {
    console.log(form);
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

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Obtiene "YYYY-MM-DD"

    const data = {
      id_travels: form.value.travel,
      id_boarding_gates: form.value.boarding_gate || null,
      id_users: 1,
      date_announcements: formattedDate,
      status: true,
      observation: form.value.observation,
    };

    if (this.isEditMode) {
      this.announcementService.updateAnnouncement(data, this.id).subscribe({
        next: (response) => {
          console.log('respuesta del update', response);
          if (response) {
            this.navigation.onMainMenuNav('Anuncios');
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
      this.announcementService.createAnnouncement(data).subscribe({
        next: (response) => {
          console.log('respuesta', response);
          if (response.message == 'success') {
            this.snackbarService.show('Guardado exitosamente', 'success');
            this.navigation.onMainMenuNav('Anuncios');
            this.isLoading = false;
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

    this.clearForm();
  }

  clearForm() {
    // this.busData.reset();
  }
  onCancel($event: string): void {
    this.navigation.onMainMenuNav('Anuncios');
  }
}

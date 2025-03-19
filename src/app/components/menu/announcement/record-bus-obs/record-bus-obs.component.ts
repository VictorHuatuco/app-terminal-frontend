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
  public isEditMode: boolean = false;
  public title: string = '';
  public id: number = 0;
  // public formData: FormGroup = new FormGroup({});
  public formDataPatched: FormGroup = new FormGroup({});
  public isFormDataPatched: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.title = 'Editar estado del bus';
        this.id = params['id'];

        // implementar endpoint para obtener el announcement
        // this.announcementService.getById(this.id).subscribe({
        //   next: (response) => {
        //     if (response.error != null) {
        //       this.navigation.onMainMenuNav('Anuncios');
        //     }
        // this.isFormDataPatched = true
        //     this.formDataPatched.patchValue(response.data);
        //   },
        // });
      } else {
        this.title = 'Anunciar estado del bus';
      }
    });

    this.getTavels();
  }
  constructor(
    private socketService: SocketService,
    private navigation: NavigationService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private travelsService: TravelsService // private announcementService: AnnouncementService
  ) {}

  getTavels() {
    this.travelsService.getTravels().subscribe({
      next: (response) => {
        console.log('lista viajes', response);
      },
      error: (error) => {
        console.error('Error', error.error);
      },
    });
  }

  onSubmit(data: FormGroup): void {
    const formData = data.value;
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

    // maneja el envio del formulario
    // if (this.isEditMode) {
    //   formData.id = this.id;
    //   this.announcementService.updateAnnouncement(formData).subscribe({
    //     next: (response) => {
    //       if (response.code == 200) {
    //         this.navigation.onMainMenuNav('Anuncios');
    //         this.snackbarService.show('Actualizado exitosamente', 'success');
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error token', error.error);
    //       this.snackbarService.show(
    //         'Ocurrió un error al actualizar la información. Inténtelo de nuevo.',
    //         'error'
    //       );
    //       this.isLoading = false;
    //     },
    //   });
    // } else {
    //   this.announcementService.createAnnouncement(formData).subscribe({
    //     next: (response) => {
    //       if (response.code == 200) {
    //         this.navigation.onMainMenuNav('Anuncios');
    //         this.snackbarService.show('Guardado exitosamente', 'success');
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error token', error.error);
    //       this.snackbarService.show(
    //         'Ocurrió un error al guardar la información. Inténtelo de nuevo.',
    //         'error'
    //       );
    //       this.isLoading = false;
    //     },
    //   });
    // }

    this.clearForm();
  }

  clearForm() {
    // this.busData.reset();
  }
  onCancel($event: string): void {
    this.navigation.onMainMenuNav('Anuncios');
  }
}

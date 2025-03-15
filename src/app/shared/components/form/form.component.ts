import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { SnackbarService } from '../../../services/snackbar.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input()
  public formFields: {
    label: string;
    formControl: string;
    type: string;
    options?: { value: string; label: string }[];
    validators?: string;
  }[] = [];

  @Input() public buttonsData: { text: string; type: string }[] = [];

  @Output()
  public onEmitFormData: EventEmitter<FormGroup> = new EventEmitter();

  @Output() public onEmitButtonAction: EventEmitter<string> =
    new EventEmitter();

  public formData!: FormGroup;
  public isLoading = false;

  emitFormData(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      this.snackbarService.show(
        'Complete los campos necesarios antes de continuar.',
        'error'
      );
      this.isLoading = false;
      return;
    }
    this.onEmitFormData.emit(this.formData);
    console.log(this.formData.value);
  }

  ngOnInit() {
    // this.formData.valueChanges.subscribe(() => {
    //   console.log(this.formData.value);
    // });
    this.initializeForm();
  }
  constructor(
    private socketService: SocketService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  public initializeForm(): void {
    let formGroupConfig: { [key: string]: FormControl } = {};

    this.formFields.forEach((field) => {
      const validators =
        field.validators === 'required' ? [Validators.required] : [];
      formGroupConfig[field.formControl] = new FormControl('', validators);
    });

    this.formData = new FormGroup(formGroupConfig);
  }

  // onSubmit(): void {
  //   if (this.formData.invalid) {
  //     this.formData.markAllAsTouched();
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

  //   this.socketService.sendBus(this.formData.value);
  //   this.clearForm();
  // }

  // onRedirectToMenu(): void {
  //   this.router.navigate(['form']);
  // }

  // clearForm() {
  //   this.formData.reset();
  // }

  onEmitAction(): void {
    this.onEmitButtonAction.emit('se emite evento');
    console.log('se emitira evento');
  }
}

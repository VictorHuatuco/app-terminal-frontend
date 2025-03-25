import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input() public formDataInitialValues: any;
  @Input()
  public formFields: {
    label: string;
    formControl: string;
    type: string;
    options?: { value: string; label: string }[];
    validators?: string;
    disabled?: boolean;
  }[] = [];

  @Input() public buttonsData: { text: string; type: string }[] = [];

  @Output()
  public onEmitFormData: EventEmitter<FormGroup> = new EventEmitter();

  @Output() public onEmitButtonAction: EventEmitter<string> =
    new EventEmitter();

  public formData!: FormGroup;
  // @Input() isFormDataPatched: boolean = false;
  // @Input() FormDataPatched!: FormGroup;
  @Input() public isLoading = false;

  handleButtonClick(button: { text: string; type: string }): void {
    if (button.type === 'submit') {
      this.onEmitFormData.emit(this.formData);
    } else {
      this.onEmitButtonAction.emit(button.text);
    }
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formDataInitialValues'] && this.formData) {
      this.formData.patchValue(this.formDataInitialValues);
    }
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
      formGroupConfig[field.formControl] = new FormControl(
        { value: '', disabled: field.disabled || false },
        validators
      );
    });

    this.formData = new FormGroup(formGroupConfig);
    this.handleObservationChange();
  }

  handleObservationChange(): void {
    this.formData.get('observation')?.valueChanges.subscribe((value) => {
      if (value === 'arrived') {
        this.formData.get('boarding_gate')?.enable();
      } else {
        this.formData.get('boarding_gate')?.disable();
        this.formData.get('boarding_gate')?.setValue(''); // Opcional: limpiar selección
      }
    });
  }
}

import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-new-bus',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-bus.component.html',
  styleUrl: './new-bus.component.scss',
})
export class NewBusComponent {
  public busData: FormGroup = new FormGroup({
    company: new FormControl('', Validators.required),
    travelRoute: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.busData.valueChanges.subscribe(() => {
      console.log(this.busData.value);
    });
  }
  constructor(private socketService: SocketService) {}
  addBus(): void {
    this.socketService.sendBus(this.busData.value);
    this.clearForm();
  }

  clearForm() {
    this.busData.reset();
  }
}

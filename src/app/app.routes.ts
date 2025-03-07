import { Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NewBusComponent } from './components/form/new-bus/new-bus.component';
import { RecordBusArrivalComponent } from './components/form/record-bus-arrival/record-bus-arrival.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  {
    path: '',
    // component: MainViewComponent,
    redirectTo: 'panel',
    pathMatch: 'full',
  },
  {
    path: 'panel',
    component: MainViewComponent,
    // redirectTo: '',
  },
  {
    path: 'form',
    component: FormComponent,
    // redirectTo: '',
  },
  {
    path: 'new-bus',
    component: NewBusComponent,
    // redirectTo: '',
  },
  {
    path: 'record-bus-arrival',
    component: RecordBusArrivalComponent,
    // redirectTo: '',
  },
];

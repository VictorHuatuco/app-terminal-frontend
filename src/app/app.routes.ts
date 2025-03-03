import { Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NewBusComponent } from './components/new-bus/new-bus.component';

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
    path: 'new-bus',
    component: NewBusComponent,
    // redirectTo: '',
  },
];

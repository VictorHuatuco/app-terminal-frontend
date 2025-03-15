import { Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { MenuComponent } from './components/menu/menu.component';
import { RecordBusObservationComponent } from './components/menu/announcement/record-bus-obs/record-bus-obs.component';
import { MenuViewComponent } from './components/menu/menu-view/menu-view.component';
import { AnnouncementComponent } from './components/menu/announcement/announcement.component';
import { TravelComponent } from './components/menu/travel/travel.component';
import { AdvertisementComponent } from './components/menu/advertisement/advertisement.component';
import { NewBusComponent } from './components/menu/travel/new-bus/new-bus.component';

export const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    // redirectTo: 'panel',
    // pathMatch: 'full',
  },
  // {
  //   path: 'panel',

  // },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: MenuViewComponent,
      },
      {
        path: 'announcements',
        children: [
          {
            path: '',
            component: AnnouncementComponent,
          },
          {
            path: 'new',
            component: RecordBusObservationComponent,
          },
        ],
      },
      {
        path: 'travels',
        children: [
          {
            path: '',
            component: TravelComponent,
          },
          {
            path: 'new-bus',
            component: NewBusComponent,
          },
        ],
      },
      {
        path: 'ads',
        component: AdvertisementComponent,
      },
    ],
    // children: [
    //   {
    //     path: '',
    //     component: MenuComponent,
    //   } ,
    //   {
    //     path: 'new',
    //     component: MenuComponent,
    //    },
    //    {
    //     path: 'edit/:id',
    //     component: MenuComponent,
    //    },
    // ],
    // redirectTo: '',
  },
];

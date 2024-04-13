import { Routes } from '@angular/router';
import { HomeComponent } from './weather/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeatherHomeComponent } from './weather/weather-home/weather-home.component';
import { DaysHomeComponent } from './future-forecast/days-home/days-home.component';

export const routes: Routes = [
  {
    path: 'five-days-forecast',
    component: DaysHomeComponent
  },
  {
    path: '',
    loadChildren: () => import('./weather/weather-routing.module').then((m) => m.WeatherRoutingModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

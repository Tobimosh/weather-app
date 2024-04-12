import { Routes } from '@angular/router';
import { HomeComponent } from './weather/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeatherHomeComponent } from './weather/weather-home/weather-home.component';

export const routes: Routes = [
  {
    path: 'five-days-forecast',
    loadChildren: () =>
      import('./future-forecast/future-forecast.module').then(
        (m) => m.FutureForecastModule
      ),
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

import { Routes } from '@angular/router';
import { HomeComponent } from './weather/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WeatherHomeComponent } from './weather/weather-home/weather-home.component';

export const routes: Routes = [
  {
    path: 'seven-days-forecast',
    loadChildren: () =>
      import('./future-forecast/future-forecast.module').then(
        (m) => m.FutureForecastModule
      ),
  },
  {
    path: 'search-location',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: '',
    component: WeatherHomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

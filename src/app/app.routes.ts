import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'seven-days-forecast',
    loadChildren: () =>
      import('./future-forecast/future-forecast.module').then(
        (m) => m.FutureForecastModule
      ),
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

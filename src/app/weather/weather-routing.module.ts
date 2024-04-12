import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherHomeComponent } from './weather-home/weather-home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchLocationComponent } from '../search/search-location/search-location.component';

const routes: Routes = [
  {
    path: '',
    component: FooterComponent,
    children: [
      { path: '', component: WeatherHomeComponent },
      {
        path: 'search-location',
        component: SearchLocationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}

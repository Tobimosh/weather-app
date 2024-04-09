import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLocationComponent } from '../weather/search-location/search-location.component';

const routes: Routes = [
  {
    path: '',
    component: SearchLocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}

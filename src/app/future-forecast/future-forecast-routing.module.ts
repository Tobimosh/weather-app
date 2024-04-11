import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysHomeComponent } from './days-home/days-home.component';

const routes: Routes = [
  {
    path: '',
    component: DaysHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FutureForecastRoutingModule {}



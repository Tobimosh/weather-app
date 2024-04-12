import { Component } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [ContainerComponent, MapComponent],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css'
})
export class SearchLocationComponent {

}

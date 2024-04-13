import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {


  public map: L.Map;
  private centroid: L.LatLngExpression;
private currentLocationMarker: any;

constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private spinner: NgxSpinnerService
) {
  this.centroid = [0, 0];
}

private async initMap(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    const L = await import('leaflet');
    console.log(L)
    this.map = new L.Map('map', {
      center: this.centroid,
      zoom: 10,
      zoomControl: false,
    }).fitWorld();

    console.log('initialised map', this.map)

    const tiles = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 6,
        attribution: '© OpenStreetMap',
      }
    );
    const markerIcon = L.icon({
      iconUrl: '../../assets/images/marker.svg',
      iconSize: [25, 41],
    });

    // const jittery = Array(5)
    //   .fill(this.centroid)
    //   .map((x) => [
    //     x[0] + (Math.random() - 0.2),
    //     x[1] + (Math.random() - 0.2),
    //   ])
    //   .map((x) =>
    //     L.marker(x as L.LatLngExpression, { icon: markerIcon }).bindPopup(
    //       'A random location on the map'
    //     )
    //   )
    //   .forEach((x) => x.addTo(this.map));
    tiles.addTo(this.map);
  }
}

getLocation() {
  if (isPlatformBrowser(this.platformId)) {
    this.spinner.show();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.centroid = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          this.initMap().then(() => {
            this.addCurrentLocationMarker(this.centroid);
            this.map.setView(this.centroid, 10);
            this.spinner.hide();
          });
        },
        (error: GeolocationPositionError) => {
          console.error('Error getting geolocation:', error);
          this.spinner.hide();
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.spinner.hide();
    }
  }
}

private async addCurrentLocationMarker(
  coordinates: L.LatLngExpression
): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    const L = await import('leaflet');
    const markerIcon = L.icon({
      iconUrl: '../../assets/images/live-location.svg',
      iconSize: [50, 50],
    });
    this.currentLocationMarker = L.marker(coordinates, {
      icon: markerIcon,
    }).addTo(this.map);
    this.currentLocationMarker.bindPopup('Where you at').openPopup();
  }
}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.getLocation();
  }
}
}
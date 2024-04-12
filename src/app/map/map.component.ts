import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  // public map: L.Map;
  // private centriod: L.LatLngExpression;

  // constructor(private spinner: NgxSpinnerService) {
  //   this.centriod = [0, 0];
  // }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: this.centriod,
  //     zoom: 10,
  //     zoomControl: false,
  //   }).fitWorld();

  //   const tiles = L.tileLayer(
  //     'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     {
  //       maxZoom: 18,
  //       minZoom: 6,
  //       attribution: '© OpenStreetMap',
  //     }
  //   );

  //   const markerIcon = L.icon({
  //     iconUrl: '../../assets/images/marker.svg',
  //     iconSize: [25, 41],
  //     // iconAnchor: [12, 41],
  //     // popupAnchor: [1, -34],
  //   });
  //   const jittery = Array(5)
  //     .fill(this.centriod)
  //     .map((x) => [x[0] + (Math.random() - 0.2), x[1] + (Math.random() - 0.2)])
  //     .map((x) =>
  //       L.marker(x as L.LatLngExpression, { icon: markerIcon }).bindPopup(
  //         "I'm here"
  //       )
  //     )
  //     .forEach((x) => x.addTo(this.map));
  //   tiles.addTo(this.map);
  // }

  // getLocation() {
  //   this.spinner.show()
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         this.centriod = [position.coords.latitude, position.coords.longitude];
  //         this.initMap();
  //         this.spinner.hide()
  //       },
  //       (error: GeolocationPositionError) => {
  //         console.error('Error getting geolocation:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }

  // ngAfterViewInit() {
  //   this.getLocation();
  // }

  // public map: L.Map;
  // private centroid: L.LatLngExpression;

  // constructor(private spinner: NgxSpinnerService) {
  //   this.centroid = [0, 0];
  // }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: this.centroid,
  //     zoom: 10,
  //     zoomControl: false,
  //   }).fitWorld();

  //   const tiles = L.tileLayer(
  //     'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     {
  //       maxZoom: 18,
  //       minZoom: 6,
  //       attribution: '© OpenStreetMap',
  //     }
  //   );

  //   const markerIcon = L.icon({
  //     iconUrl: '../../assets/images/marker.svg',
  //     iconSize: [25, 41],
  //   });

  //   const jittery = Array(5)
  //     .fill(this.centroid)
  //     .map((x) => [x[0] + (Math.random() - 0.2), x[1] + (Math.random() - 0.2)])
  //     .map((x) =>
  //       L.marker(x as L.LatLngExpression, { icon: markerIcon }).bindPopup(
  //         "I'm here"
  //       )
  //     )
  //     .forEach((x) => x.addTo(this.map));
  //   tiles.addTo(this.map);
  // }

  // getLocation() {
  //   this.spinner.show();
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         this.centroid = [position.coords.latitude, position.coords.longitude];
  //         this.initMap();
  //         this.addCurrentLocationMarker(); // Call method to add marker for current location
  //         this.spinner.hide();
  //       },
  //       (error: GeolocationPositionError) => {
  //         console.error('Error getting geolocation:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }

  // private addCurrentLocationMarker(): void {
  //   const currentLocationMarker = L.marker(this.centroid).addTo(this.map);
  //   currentLocationMarker.bindPopup("You're here").openPopup();
  // }

  // ngAfterViewInit() {
  //   this.getLocation();
  // }

  // public map: L.Map;
  // private centroid: L.LatLngExpression;

  // constructor(private spinner: NgxSpinnerService) {
  //   this.centroid = [0, 0];
  // }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: this.centroid,
  //     zoom: 10,
  //     zoomControl: false,
  //   });

  //   const tiles = L.tileLayer(
  //     'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     {
  //       maxZoom: 18,
  //       minZoom: 6,
  //       attribution: '© OpenStreetMap',
  //     }
  //   );

  //   tiles.addTo(this.map);
  // }

  // getLocation() {
  //   this.spinner.show();
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         this.centroid = [position.coords.latitude, position.coords.longitude];
  //         this.initMap();
  //         this.addCurrentLocationMarker(this.centroid); // Add marker for current location
  //         this.map.setView(this.centroid, 10); // Center map to current location
  //         this.spinner.hide();
  //       },
  //       (error: GeolocationPositionError) => {
  //         console.error('Error getting geolocation:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }

  // private addCurrentLocationMarker(coordinates: L.LatLngExpression): void {
  //   const currentLocationMarker = L.marker(coordinates).addTo(this.map);
  //   currentLocationMarker.bindPopup('My Location').openPopup();
  // }

  // ngAfterViewInit() {
  //   this.getLocation();
  // }

  public map: L.Map;
  private centroid: L.LatLngExpression;
  private currentLocationMarker: L.Marker;

  constructor(private spinner: NgxSpinnerService) {
    this.centroid = [0, 0];
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 10,
      zoomControl: false,
    }).fitWorld();

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

    const jittery = Array(5)
      .fill(this.centroid)
      .map((x) => [x[0] + (Math.random() - 0.2), x[1] + (Math.random() - 0.2)])
      .map((x) =>
        L.marker(x as L.LatLngExpression, { icon: markerIcon }).bindPopup(
          "A random location on the map"
        )
      )
      .forEach((x) => x.addTo(this.map));
    tiles.addTo(this.map);
  }

  getLocation() {
    this.spinner.show();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.centroid = [position.coords.latitude, position.coords.longitude];
          this.initMap();
          this.addCurrentLocationMarker(this.centroid); // Add marker for current location
          this.map.setView(this.centroid, 10); // Center map to current location
          this.spinner.hide();
        },
        (error: GeolocationPositionError) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  private addCurrentLocationMarker(coordinates: L.LatLngExpression): void {
    const markerIcon = L.icon({
      iconUrl: '../../assets/images/live-location.svg',
      iconSize: [50, 50],
    });
    this.currentLocationMarker = L.marker(coordinates, {
      icon: markerIcon,
    }).addTo(this.map);
    this.currentLocationMarker.bindPopup('Where you at').openPopup();
  }

  ngAfterViewInit() {
    this.getLocation();
  }
}
import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherService } from './weather.service';
import {faLocation} from '@fortawesome/free-solid-svg-icons'
import { WeatherData } from './models/weather.model';
import { Coord, Weather, Main, Wind } from './models/weather.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

// @Injectable()
export class AppComponent implements OnInit {

  weatherDetails: WeatherData = null;
  latitude: number;
  longitude: number;
  errorMessage: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          // Once you have latitude and longitude, fetch weather condition
          this.fetchWeather();
        },
        (error: GeolocationPositionError) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.errorMessage = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              this.errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              this.errorMessage = 'The request to get user location timed out.';
              break;
          }
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  fetchWeather() {
    this.weatherService
      .fetchWeatherCondition(this.latitude, this.longitude)
      .subscribe((res) => {
        this.weatherDetails = res;
        console.log(res);
      });
  }
}

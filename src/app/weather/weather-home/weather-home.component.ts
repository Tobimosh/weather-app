import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { WeatherService } from '../../weather.service';
import { WeatherData } from '../../models/weather.model';
import { WeatherForecastService } from '../../weather-forecast.service';
import { RouterOutlet } from '@angular/router';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import {  NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-home',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, NgxSpinnerModule, CommonModule],
  templateUrl: './weather-home.component.html',
  styleUrl: './weather-home.component.css',
})
export class WeatherHomeComponent {
  weatherDetails: WeatherData = null;
  forecastDetails: ForeCastWeather = null;
  latitude: number;
  longitude: number;
  errorMessage: string;

  constructor(
    private weatherService: WeatherService,
    private forecastService: WeatherForecastService,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit() {
    this.getLocation();
  }

  getLocation() {
    this.spinner.show()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.fetchWeather();
          this.fetchForecast();
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
  fetchForecast() {
    this.forecastService
      .fetchWeatherCondition(this.latitude, this.longitude)
      .subscribe((res) => {
        this.forecastDetails = res;
        this.spinner.hide();

      });
  }
}

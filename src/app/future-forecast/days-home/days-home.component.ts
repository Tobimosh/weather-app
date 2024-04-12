import { Component } from '@angular/core';
import { DaysComponent } from '../days/days.component';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import { WeatherForecastService } from '../../weather-forecast.service';
import { WeatherData } from '../../models/weather.model';
import { WeatherService } from '../../weather.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-days-home',
  standalone: true,
  imports: [DaysComponent],
  templateUrl: './days-home.component.html',
  styleUrl: './days-home.component.css',
})
export class DaysHomeComponent {

  forecastDetails: ForeCastWeather = null;
  latitude: number;
  longitude: number;

  constructor(
    private weatherService: WeatherService,
    private forecastService: WeatherForecastService,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit() {
    this.getLocation();
  }

  getLocation() {
    this.spinner.show();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.fetchForecast();
        },
  
      );
    } 
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

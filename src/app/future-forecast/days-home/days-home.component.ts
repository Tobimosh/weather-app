import { Component } from '@angular/core';
import { DaysComponent } from '../days/days.component';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import { WeatherForecastService } from '../../weather-forecast.service';
import { WeatherData } from '../../models/weather.model';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-days-home',
  standalone: true,
  imports: [DaysComponent],
  templateUrl: './days-home.component.html',
  styleUrl: './days-home.component.css',
})
export class DaysHomeComponent {
  forecastData: ForeCastWeather;
  weatherData: WeatherData;

  constructor(private weatherService: WeatherForecastService, private weather: WeatherService) {}

  ngOnInit() {
    this.forecastData = this.weatherService.forecastData;
    // this.weatherData = this.weather.cachedWeatherData
  }
}

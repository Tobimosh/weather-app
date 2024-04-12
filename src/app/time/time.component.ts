import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ForeCastWeather } from '../models/forecastWeather.model';
import { WeatherForecastService } from '../weather-forecast.service';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css',
})
export class TimeComponent {
  @Input() forecastData: ForeCastWeather;

  constructor() {}
 

  kelvinToCelsius(tempKelvin: number): number {
    return Math.floor(tempKelvin - 273.15);
  }

  getTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  getWeatherIconUrl(icon: string): string {
    return `assets/icons/${icon}.png`;
  }
}

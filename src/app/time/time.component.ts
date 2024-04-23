import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ForeCastWeather, List } from '../models/forecastWeather.model';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css',
})
export class TimeComponent {
  @Input() forecastData: ForeCastWeather;
  currentDayData: List[] = [];

  constructor() {}

  ngOnInit() {
    if (this.forecastData) {
      this.filterCurrentDayData();
    }
  }
  kelvinToCelsius(tempKelvin: number): number {
    return Math.floor(tempKelvin - 273.15);
  }

  filterCurrentDayData() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    this.currentDayData = this.forecastData.list.filter((item) => {
      const entryDate = new Date(item.dt * 1000);
      return entryDate.getDate() === currentDay;
    });
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  getFormattedTime(item: List): string {
    const date = new Date(item.dt * 1000);
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  getWeatherIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }
}

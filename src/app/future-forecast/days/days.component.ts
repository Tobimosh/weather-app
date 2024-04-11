import { Component, Input } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { TimeComponent } from '../../time/time.component';
import { RouterLink } from '@angular/router';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import { WeatherForecastService } from '../../weather-forecast.service';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../models/weather.model';

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [ContainerComponent, TimeComponent, RouterLink, CommonModule],
  templateUrl: './days.component.html',
  styleUrl: './days.component.css',
})
export class DaysComponent {
  @Input() forecastData: ForeCastWeather;
  @Input() weatherData: WeatherData;
  latitude: number;
  longitude: number;
  errorMessage: string;


  getDayName(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  }

  getDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return `${date.getDate()} ${this.getMonthName(date.getMonth())}`;
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthIndex];
  }

  groupByDay(list: any[]): any[][] {
    const result: any[][] = [];
    const dayMap: Map<string, any[]> = new Map();
    for (const item of list) {
      const date = new Date(item.dt_txt);
      const dateString = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      if (!dayMap.has(dateString)) {
        dayMap.set(dateString, []);
      }
      dayMap.get(dateString).push(item);
    }
    dayMap.forEach((value) => result.push(value));
    return result;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../container/container.component';
import { ForeCastWeather, List } from '../../models/forecastWeather.model';
import { TimeComponent } from '../../time/time.component';

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [ContainerComponent, TimeComponent, RouterLink, CommonModule],
  templateUrl: './days.component.html',
  styleUrl: './days.component.css',
})
export class DaysComponent {
  @Input() forecastData: ForeCastWeather;
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
  kelvinToCelsius(tempKelvin: number): number {
    return Math.floor(tempKelvin - 273);
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

  groupByDay(list: List[]): List[] {
    const result: List[] = [];
    const dayMap: Map<string, List> = new Map();

    if (!Array.isArray(list)) return result;

    for (const item of list) {
      const date = new Date(item.dt_txt);
      const dateString = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;

      if (!dayMap.has(dateString)) {
        dayMap.set(dateString, item);
        result.push(item);
      }
    }

    return result;
  }

  groupedData() {
    return this.groupByDay(this.forecastData?.list);
  }
}

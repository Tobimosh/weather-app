import { Component } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { TimeComponent } from '../../time/time.component';
import { RouterLink } from '@angular/router';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import { WeatherForecastService } from '../../weather-forecast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [ContainerComponent, TimeComponent, RouterLink, CommonModule],
  templateUrl: './days.component.html',
  styleUrl: './days.component.css',
})
export class DaysComponent {
  weatherDetails: ForeCastWeather = null;
  latitude: number;
  longitude: number;
  errorMessage: string;

  constructor(private weatherService: WeatherForecastService) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
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
        console.log(this.weatherDetails.list.length);
        this.weatherService.setForecastData(res);
      });
  }
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

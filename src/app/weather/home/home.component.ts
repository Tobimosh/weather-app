import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from '../../container/container.component';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import { WeatherData } from '../../models/weather.model';
import { TimeComponent } from '../../time/time.component';
import { WeatherForecastService } from '../../weather-forecast.service';
import { FooterComponent } from '../footer/footer.component';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FontAwesomeModule,
    ContainerComponent,
    DatePipe,
    TimeComponent,
    RouterLink,
    CommonModule,
    FooterComponent,
    GraphComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input() weather: WeatherData;
  @Input() forecastWeather: ForeCastWeather;
  currentTime: string;

  constructor(private weatherService: WeatherForecastService) {
    this.currentTime = this.getCurrentTime();
  }

  private getCurrentTime(): string {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let meridian = 'am';
    let hour = currentHour;

    if (currentHour > 12) {
      hour -= 12;
      meridian = 'pm';
    }

    const formattedTime = `Today ${hour}:${
      currentMinute < 10 ? '0' + currentMinute : currentMinute
    }${meridian}`;
    return formattedTime;
  }

  calculateWeatherCondition(): string {
    if (!this.weather) {
      return 'unknown';
    }

    const currentDate = new Date();
    const sunriseTime = new Date(this.weather.sys.sunrise * 1000);
    const sunsetTime = new Date(this.weather.sys.sunset * 1000);

    const isDaytime = currentDate >= sunriseTime && currentDate < sunsetTime;

    const mainWeather = this.weather.weather[0]?.main.toLowerCase();

    if (isDaytime) {
      switch (mainWeather) {
        case 'rain':
          return 'day-rainy';
        case 'clear':
          return 'day-clear';
        case 'clouds':
          return 'day-cloudy';
        case 'snow':
          return 'day-snowy';
        case 'thunderstorm':
          return 'thunderstorm';
        default:
          return 'day-unknown';
      }
    } else {
      switch (mainWeather) {
        case 'rain':
          return 'night-rainy';
        case 'clear':
          return 'night-clear';
        case 'clouds':
          return 'night-cloudy';
        case 'snow':
          return 'night-snowy';
        case 'thunderstorm':
          return 'thunderstorm'
        default:
          return 'night-unknown';
      }
    }
  }

  kelvinToCelsius(tempKelvin: number): number {
    return Math.floor(tempKelvin - 273.15);
  }

  getBackgroundImage(): string {
    const weatherCondition = this.calculateWeatherCondition();
    const isDaytime = weatherCondition.includes('day');

    switch (weatherCondition) {
      case 'day-rainy':
        return '../../../assets/images/rainyNight.avif';
      case 'day-clear':
        return '../../../assets/images/clear.avif';
      case 'day-cloudy':
        return '../../../assets/images/clouddAY.webp';
      case 'day-snowy':
        return '../../assets/images/day-snowy-background.jpg';
      case 'night-rainy':
        return '../../../assets/images/rainyNight.avif';
      case 'day-thunderstorm':
        return '../../../assets/images/thunderstorm.webp';
      case 'night-thunderstorm':
        return '../../../assets/images/thunderstorm.webp';
      case 'night-clear':
        return '../../../assets/images/clearnight.avif';
      case 'night-cloudy':
        return '../../../assets/images/nightCloud.webp';
      case 'night-snowy':
        return '../../assets/images/night-snowy-background.jpg';
      default:
        return ''; // You can provide a default background image or handle other conditions as needed
    }
  }
}

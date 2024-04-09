import { Component, Input, Pipe } from '@angular/core';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from '../../container/container.component';
import { Main, Weather, WeatherData } from '../../models/weather.model';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { TimeComponent } from '../../time/time.component';
import { RouterLink } from '@angular/router';
import { WeatherForecastService } from '../../weather-forecast.service';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import { FooterComponent } from '../footer/footer.component';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input() weather: WeatherData;
  currentTime: string;

  forecastService: ForeCastWeather;
  constructor(private weatherService: WeatherForecastService) {
    this.currentTime = this.getCurrentTime();
  }

  ngOnInit() {
    this.forecastService = this.weatherService.getForecastData();
    console.log(this.forecastService);
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
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForeCastWeather } from './models/forecastWeather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
   forecastData: ForeCastWeather;

  constructor(private httpClient: HttpClient) {}

  fetchWeatherCondition(lat: number, lon: number) {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', '9c75934586c8328ec17edc20704f9274');

    return this.httpClient.get<ForeCastWeather>(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: params,
      }
    );
  }
  setForecastData(data: any) {
    this.forecastData = data;
  }

  getForecastData() {
    return this.forecastData;
  }
}

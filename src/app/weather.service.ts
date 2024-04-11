import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  cachedWeatherData: WeatherData;
  constructor(private httpClient: HttpClient) {}

  fetchWeatherCondition(lat: number, lon: number): Observable<WeatherData> {
    if (this.cachedWeatherData) {
      return of(this.cachedWeatherData);
    } else {
      const params = new HttpParams()
        .set('lat', lat)
        .set('lon', lon)
        .set('appid', '9c75934586c8328ec17edc20704f9274');

      return this.httpClient.get<WeatherData>(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: params,
        }
      )
    }
  }
}

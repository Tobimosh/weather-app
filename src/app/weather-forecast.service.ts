import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForeCastWeather } from './models/forecastWeather.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  forecastData: ForeCastWeather;

  constructor(private httpClient: HttpClient) {}

  fetchWeatherCondition(lat: number, lon: number): Observable<ForeCastWeather> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', '9c75934586c8328ec17edc20704f9274');

    return this.httpClient
      .get<ForeCastWeather>(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params: params,
        }
      )
      .pipe(
        tap((data: ForeCastWeather) => {
          this.forecastData = data;
        })
      );
  }
}

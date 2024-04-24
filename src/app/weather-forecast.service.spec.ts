import { TestBed } from '@angular/core/testing';

import { WeatherForecastService } from './weather-forecast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ForeCastWeather } from './models/forecastWeather.model';
import { futureForecast } from './MockDataForTest/futureForecast';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;
  let testingController : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherForecastService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should fetch forecast weather data", () => {
    const mockForecastData : ForeCastWeather = futureForecast


    const lat = 0;
    const lon = 0;

    service.fetchWeatherCondition(lat, lon).subscribe((data) => {
      expect(data).toEqual(mockForecastData)
    })

    const req = testingController.expectOne(
      'https://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&appid=9c75934586c8328ec17edc20704f9274'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mockForecastData)
  })
});

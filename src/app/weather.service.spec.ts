import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherData } from './models/weather.model';
import { weatherDataTest } from './MockDataForTest/data';

describe('WeatherService', () => {
  let service: WeatherService;
  let testingController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WeatherService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('should fetch weather condition', () => {
      const mockWeatherData: WeatherData = weatherDataTest

      const lat = 0;
      const lon = 0; 

      service.fetchWeatherCondition(lat, lon).subscribe((data) => {
        expect(data).toEqual(mockWeatherData);
      });

      const req = testingController.expectOne(
        'https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=9c75934586c8328ec17edc20704f9274'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockWeatherData);
    });


      it('should return cached data if available', () => {
        const mockCachedData: WeatherData = weatherDataTest

        service.cachedWeatherData = mockCachedData;

        const lat = 0; // Mock latitude
        const lon = 0; // Mock longitude

        service.fetchWeatherCondition(lat, lon).subscribe((data) => {
          expect(data).toEqual(mockCachedData);
        });

        testingController.expectNone(
          'https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=9c75934586c8328ec17edc20704f9274'
        );
      });

});

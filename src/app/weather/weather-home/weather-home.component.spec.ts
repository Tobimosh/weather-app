import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { weatherDataTest } from '../../MockDataForTest/data';
import { WeatherForecastService } from '../../weather-forecast.service';
import { WeatherService } from '../../weather.service';
import { HomeComponent } from '../home/home.component';
import { WeatherHomeComponent } from './weather-home.component';
import { futureForecast } from '../../MockDataForTest/futureForecast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WeatherHomeComponent', () => {
  let component: WeatherHomeComponent;
  let fixture: ComponentFixture<WeatherHomeComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let forecastService: jasmine.SpyObj<WeatherForecastService>;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'fetchWeatherCondition',
    ]);
    const forecastServiceSpy = jasmine.createSpyObj('WeatherForecastService', [
      'fetchWeatherCondition',
    ]);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', [
      'show',
      'hide',
      'getSpinner',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgxSpinnerModule,
        // RouterTestingModule, // Import RouterTestingModule here
        HttpClientModule,
        WeatherHomeComponent,
        HomeComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: WeatherForecastService, useValue: forecastServiceSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        NgxSpinnerService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherHomeComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(
      WeatherService
    ) as jasmine.SpyObj<WeatherService>;
    forecastService = TestBed.inject(
      WeatherForecastService
    ) as jasmine.SpyObj<WeatherForecastService>;
    fixture.detectChanges();
  });

  it('should fetch weather details', () => {
    const weatherData = weatherDataTest;
    weatherService.fetchWeatherCondition.and.returnValue(of(weatherData));
    component.latitude = 123;
    component.longitude = 456;
    component.fetchWeather();

    expect(weatherService.fetchWeatherCondition).toHaveBeenCalledWith(123, 456);
    expect(component.weatherDetails).toEqual(weatherData);
  });

  it('should fetch future weather forecast', () => {
    const forecastData = futureForecast;
    forecastService.fetchWeatherCondition.and.returnValue(of(forecastData));
    component.latitude = 123;
    component.longitude = 456;
    component.fetchForecast();

    expect(forecastService.fetchWeatherCondition).toHaveBeenCalledWith(
      123,
      456
    );
    expect(component.forecastDetails).toEqual(forecastData);
  });

  it('should fetch weather and forecast when geolocation is available', fakeAsync(() => {
    spinnerServiceSpy = TestBed.inject(
      NgxSpinnerService
    ) as jasmine.SpyObj<NgxSpinnerService>;

    const position = {
      coords: {
        latitude: 10,
        longitude: 20,
        accuracy: 30,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    };

    const weatherData = weatherDataTest;
    const forecastData = futureForecast;

    weatherService.fetchWeatherCondition.and.returnValue(of(weatherData));
    forecastService.fetchWeatherCondition.and.returnValue(of(forecastData));

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (successCallback, errorCallback) => {
        successCallback(position);
        errorCallback({
          code: GeolocationPositionError.PERMISSION_DENIED,
          PERMISSION_DENIED: 1,
        } as GeolocationPositionError);

        errorCallback({
          code: GeolocationPositionError.POSITION_UNAVAILABLE,
          POSITION_UNAVAILABLE: 2,
        } as GeolocationPositionError);

        errorCallback({
          code: GeolocationPositionError.TIMEOUT,
          TIMEOUT: 3,
        } as GeolocationPositionError);
      }
    );

    component.getLocation();

    flush();

    // expect(spinnerServiceSpy.show).toHaveBeenCalled();
    expect(weatherService.fetchWeatherCondition).toHaveBeenCalledWith(
      position.coords.latitude,
      position.coords.longitude
    );
    expect(forecastService.fetchWeatherCondition).toHaveBeenCalledWith(
      position.coords.latitude,
      position.coords.longitude
    );
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

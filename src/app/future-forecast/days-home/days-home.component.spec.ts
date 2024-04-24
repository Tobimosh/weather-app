import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { of } from 'rxjs';
import { futureForecast } from '../../MockDataForTest/futureForecast';
import { routes } from '../../app.routes';
import { WeatherForecastService } from '../../weather-forecast.service';
import { DaysComponent } from '../days/days.component';
import { DaysHomeComponent } from './days-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DaysHomeComponent', () => {
  let component: DaysHomeComponent;
  let fixture: ComponentFixture<DaysHomeComponent>;
  let forecastService: jasmine.SpyObj<WeatherForecastService>;

  beforeEach(async () => {
    const forecastServiceSpy = jasmine.createSpyObj('WeatherForecastService', [
      'fetchWeatherCondition',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        NgxSpinnerModule,
        RouterModule.forRoot(routes),
        DaysComponent,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
        { provide: WeatherForecastService, useValue: forecastServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DaysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysHomeComponent);
    component = fixture.componentInstance;

    forecastService = TestBed.inject(
      WeatherForecastService
    ) as jasmine.SpyObj<WeatherForecastService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should fetch weather data when geolocation is available', fakeAsync(() => {
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

    const forecastData = futureForecast;
    forecastService.fetchWeatherCondition.and.returnValue(of(forecastData));
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (successCallback) => {
        successCallback(position);
      }
    );

    component.getLocation();
    flush();

    expect(forecastService.fetchWeatherCondition).toHaveBeenCalledWith(
      position.coords.latitude,
      position.coords.longitude
    );
  }));
});

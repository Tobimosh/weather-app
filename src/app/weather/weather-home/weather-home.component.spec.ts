import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { weatherDataTest } from '../../MockDataForTest/data';
import { WeatherForecastService } from '../../weather-forecast.service';
import { WeatherService } from '../../weather.service';
import { HomeComponent } from '../home/home.component';
import { WeatherHomeComponent } from './weather-home.component';
import { futureForecast } from '../../MockDataForTest/futureForecast';

describe('WeatherHomeComponent', () => {
  let component: WeatherHomeComponent;
  let fixture: ComponentFixture<WeatherHomeComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let forecastService: jasmine.SpyObj<WeatherForecastService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'fetchWeatherCondition',
    ]);
    const forecastServiceSpy = jasmine.createSpyObj('WeatherForecastService', [
      'fetchWeatherCondition',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgxSpinnerModule,
        // RouterTestingModule, // Import RouterTestingModule here
        HttpClientModule,
        WeatherHomeComponent,
        HomeComponent
      ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy }, 
        { provide: WeatherForecastService, useValue: forecastServiceSpy },
        NgxSpinnerService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherHomeComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>; 
    forecastService = TestBed.inject(WeatherForecastService) as jasmine.SpyObj<WeatherForecastService>; 
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


        expect(forecastService.fetchWeatherCondition).toHaveBeenCalledWith(123,456);
        expect(component.forecastDetails).toEqual(forecastData);

  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from '../../container/container.component';
import { TimeComponent } from '../../time/time.component';
import { FooterComponent } from '../footer/footer.component';
import { GraphComponent } from '../graph/graph.component';
import { routes } from '../weather-routing.module';
import { weatherDataTest } from '../../MockDataForTest/data';
import { Weather } from '../../models/forecastWeather.model';
import { Sys, WeatherData } from '../../models/weather.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ContainerComponent,
        DatePipe,
        TimeComponent,
        RouterLink,
        CommonModule,
        FooterComponent,
        GraphComponent,
        RouterModule.forRoot(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    component.weather = weatherDataTest;
  });



  it('should return correct formatted weather data based on fetched weather data', () => {
    spyOn(component, 'getCurrentTime').and.returnValue('Today 19:00pm');

    const spy = spyOn(component, 'calculateWeatherCondition').and.callThrough();

    let weatherData = {
      weather: [
        {
          main: 'rain',
        } as Weather,
      ],
      sys: { sunrise: 1661834187, sunset: 1661882248 } as Sys,
    } as WeatherData;

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'clear';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'clouds';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'snow';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'thunderstorm';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = '';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'rain';
    weatherData.sys = { sunrise: 1661882248, sunset: 1661834187 } as Sys;

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'clear';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'clouds';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'snow';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = 'thunderstorm';

    component.weather = weatherData;

    component.calculateWeatherCondition();

    weatherData.weather[0].main = '';

    component.weather = weatherData;

    expect(spy).toHaveBeenCalled();

    expect(component.calculateWeatherCondition()).toEqual('night-unknown');
  });

  it('should return "unknown" when weather data is missing', () => {
    component.weather = null; 
    expect(component.calculateWeatherCondition()).toEqual('unknown');
  });

  it('should return accurate celcius value from the kelvin value', () => {
    const kelvinValue = 350;
    expect(component.kelvinToCelsius(kelvinValue)).toBe(77);
    expect(component.kelvinToCelsius(273.15)).toEqual(0);
    expect(component.kelvinToCelsius(0)).toEqual(-273);
  });

  it('should return correct background image URL based on weather condition', () => {
    const spy = spyOn(component, 'getBackgroundImage').and.callThrough();


       let weatherData = {
         weather: [
           {
             main: 'rain',
           } as Weather,
         ],
         sys: { sunrise: 1661834187, sunset: 1661882248 } as Sys,
       } as WeatherData;

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'clear';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'clouds';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'snow';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'thunderstorm';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = '';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'rain';
       weatherData.sys = { sunrise: 1661882248, sunset: 1661834187 } as Sys;

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'clear';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'clouds';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'snow';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = 'thunderstorm';

       component.weather = weatherData;

       component.getBackgroundImage();

       weatherData.weather[0].main = '';

       component.weather = weatherData;



    expect(spy).toHaveBeenCalled();
    expect(component.getBackgroundImage()).toEqual('');
  });
});

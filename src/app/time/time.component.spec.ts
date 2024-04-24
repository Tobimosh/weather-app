import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeComponent } from './time.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ForeCastWeather, List } from '../models/forecastWeather.model';
import { futureForecast } from '../MockDataForTest/futureForecast';

describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeComponent,CommonModule, RouterLink],
    }).compileComponents();
    
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handle OnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.forecastData = futureForecast;

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  describe('filterCurrentDayData', () => {
    it('should filter the forecastData to contain only items from the current day', () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const forecastData: ForeCastWeather = futureForecast
      component.forecastData = forecastData;

      component.filterCurrentDayData();

      expect(component.currentDayData.length).toBe(8);
      expect(new Date(component.currentDayData[0].dt * 1000).getDate()).toBe(
        currentDay
      );
    });


  });

  describe('getFormattedTime', () => {
    it('should return formatted time in HH:MM format', () => {
      component.forecastData = futureForecast;

      const testItem: List = futureForecast.list[0]; 
      const formattedTime = component.getFormattedTime(testItem);
      expect(formattedTime).toBe('16:00');
    });


  });

   it('should return accurate celcius value from the kelvin value', () => {
     const kelvinValue = 350;
     expect(component.kelvinToCelsius(kelvinValue)).toBe(77);
     expect(component.kelvinToCelsius(273.15)).toEqual(0);
     expect(component.kelvinToCelsius(0)).toEqual(-273);
   });

   it('should return a URL in the correct format', () => {
     const iconCode = '01d'; // Example icon code

     const result = component.getWeatherIconUrl(iconCode);

     // Verify that the result is a string
     expect(typeof result).toBe('string');
     expect(result).toContain('http://openweathermap.org/img/wn/');

     expect(result).toContain(iconCode);

     expect(result.endsWith('.png')).toBeTrue();
   });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeComponent } from './time.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ForeCastWeather, List } from '../models/forecastWeather.model';
import { futureForecast } from '../MockDataForTest/futureForecast';

fdescribe('TimeComponent', () => {
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

  describe('filterCurrentDayData', () => {
    it('should filter the forecastData to contain only items from the current day', () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const forecastData: ForeCastWeather = futureForecast
      component.forecastData = forecastData;

      component.filterCurrentDayData();

      expect(component.currentDayData.length).toBe(3);
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
});

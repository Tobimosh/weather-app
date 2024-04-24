import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { ContainerComponent } from '../../container/container.component';
import { TimeComponent } from '../../time/time.component';
import { DaysComponent } from './days.component';
import { futureForecast } from '../../MockDataForTest/futureForecast';

describe('DaysComponent', () => {
  let component: DaysComponent;
  let fixture: ComponentFixture<DaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DaysComponent,
        ContainerComponent,
        TimeComponent,
        RouterLink,
        CommonModule,
        RouterModule.forRoot(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return accurate celcius value from the kelvin value', () => {
    const spy = spyOn(component, 'kelvinToCelsius').and.callThrough();
    const kelvinValue = 350;
    expect(component.kelvinToCelsius(kelvinValue)).toBe(77);
    expect(component.kelvinToCelsius(273.15)).toEqual(0);
    expect(component.kelvinToCelsius(0)).toEqual(-273);
  });

  it('should return day name correctly', () => {
    const dateTimeString = '2024-04-24T12:00:00';
    const dayName = component.getDayName(dateTimeString);
    expect(dayName).toEqual('Wednesday');
  });

  it('should return formatted date correctly', () => {
    const dateTimeString = '2024-04-24T12:00:00';
    const formattedDate = component.getDate(dateTimeString);
    expect(formattedDate).toEqual('24 April');
  });

  it('should return month name correctly', () => {
    const monthIndex = 3;
    const monthName = component.getMonthName(monthIndex);
    expect(monthName).toEqual('April');
  });

  it('should group forecast data by day', () => {
    component.forecastData = futureForecast;
    const groupedData = component.groupedData();
    expect(groupedData.length).toEqual(6);
  });
});

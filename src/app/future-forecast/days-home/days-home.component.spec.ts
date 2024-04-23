import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysHomeComponent } from './days-home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WeatherForecastService } from '../../weather-forecast.service';
import { WeatherService } from '../../weather.service';
import { PLATFORM_ID } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { DaysComponent } from '../days/days.component';
import { HttpClientModule } from '@angular/common/http';

describe('DaysHomeComponent', () => {
  let component: DaysHomeComponent;
  let fixture: ComponentFixture<DaysHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxSpinnerModule,
        RouterTestingModule.withRoutes(routes),
        DaysComponent,
        HttpClientModule
      ],
      providers: [
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
        WeatherForecastService,
        WeatherService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DaysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

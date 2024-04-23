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
    component.weather = weatherDataTest
  })


    // it('should format current time correctly', () => {
    //   const mockDate = new Date('2022-01-01T12:30:00');
    //   spyOn(globalThis, 'Date').and.returnValue(mockDate);

    //   const expectedTime = 'Today 12:30pm';
    //   expect(component.getCurrentTime()).toEqual(expectedTime);
    // });

    // calculate weather condition test

    it('should return correct formatted weather data based on fetched weather data', () => {
      expect(component.calculateWeatherCondition()).toEqual('night-rainy');
    });


    it('should return "unknown" when weather data is missing', () => {
      component.weather = null; // Simulate missing weather data
      expect(component.calculateWeatherCondition()).toEqual('unknown');
    });

    it('should return accurate celcius value from the kelvin value', () => {
      const kelvinValue = 350;
      expect(component.kelvinToCelsius(kelvinValue)).toBe(77);
      expect(component.kelvinToCelsius(273.15)).toEqual(0);
      expect(component.kelvinToCelsius(0)).toEqual(-273);

    });

      it('should return correct background image URL based on weather condition', () => {
        spyOn(component, 'calculateWeatherCondition').and.returnValue(
          'day-clear'
        );
        expect(component.getBackgroundImage()).toContain('clear.avif');
      });
  
});

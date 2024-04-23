import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';
import { JsonPipe, CommonModule } from '@angular/common';
import { futureForecast } from '../../MockDataForTest/futureForecast';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphComponent, JsonPipe, CommonModule],
    }).compileComponents();
    
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should process forecast data correctly and generate chart data', () => {
  //   const forecastData = futureForecast;
  //   component.processForecastData(forecastData);

  //   // Check the generated temperature chart data
  //   expect(component.temperatureChartData.length).toBe(1); 
  //   expect(component.temperatureChartData[0].label).toBe('Average Temperature');

  //   expect(component.chartData).toBeTruthy();

  //   spyOn(console, 'log');
  //   component.processForecastData(forecastData);
  //   expect(console.log).toHaveBeenCalledWith(component.temperatureChartData);
  // });
});

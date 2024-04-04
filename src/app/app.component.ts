import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private weatherService: WeatherService){

  }

  ngOnInit(){

    this.weatherService
      .fetchWeatherCondition(33.44, -94.04)
      .subscribe((res) => console.log(res));

  }
}

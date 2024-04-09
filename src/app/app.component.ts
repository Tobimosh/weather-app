import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './weather/home/home.component';
import { WeatherService } from './weather.service';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from './models/weather.model';
import { Coord, Weather, Main, Wind } from './models/weather.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

// @Injectable()
export class AppComponent {}

import { Component, Input, Pipe} from '@angular/core';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from '../container/container.component';
import { Main, Weather, WeatherData } from '../models/weather.model';
import { DatePipe } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, ContainerComponent, DatePipe, TimeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input() weather: WeatherData;
  location = faLocation;
  // currentDate: number = Date.now();
  // private timerSubscription: Subscription;

  // constructor() {
  //   this.timerSubscription = interval(60000).subscribe(() => {
  //     this.currentDate = Date.now();
  //   });
  // }

  // ngOnDestroy() {
  //   this.timerSubscription.unsubscribe();
  // }
}

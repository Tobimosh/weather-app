import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css',
})
export class TimeComponent {
  items = [
    {
      time: '12pm',
      img: '../../assets/5311351.png',
      deg: '23',
    },
    {
      time: '12pm',
      img: '../../assets/5311351.png',
      deg: '23',
    },
    {
      time: '12pm',
      img: '../../assets/5311351.png',
      deg: '23',
    },
    {
      time: '12pm',
      img: '../../assets/5311351.png',
      deg: '23',
    },
    {
      time: '12pm',
      img: '../../assets/5311351.png',
      deg: '23',
    },
  ];
}

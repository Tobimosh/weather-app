import { Component, Input, Pipe } from '@angular/core';

import { WeatherForecastService } from '../../weather-forecast.service';
import { Chart, registerables } from 'chart.js';
import { ForeCastWeather } from '../../models/forecastWeather.model';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
})
export class GraphComponent {
  @Input() forecastData: ForeCastWeather;

  temperatureChartData: any[] = [];
  temperatureChartLabels: string[] = [];
  temperatureChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  chartData: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    setTimeout(() =>     this.processForecastData(this.forecastData), 4000)
  }

  processForecastData(data: any) {
    const timeIntervals = {
      Morning: [6, 7, 8, 9],
      Afternoon: [12, 13, 14, 15],
      Evening: [16, 17, 18, 19],
      Night: [20, 21, 22, 23, 0, 1, 2, 3, 4, 5],
    };

    const temperatureData: { [key: string]: number[] } = {};
    for (const interval in timeIntervals) {
      if (timeIntervals.hasOwnProperty(interval)) {
        temperatureData[interval] = [];
      }
    }

    data?.list.forEach((item: any) => {
      const hour = new Date(item.dt_txt).getHours();
      for (const interval in timeIntervals) {
        if (
          timeIntervals.hasOwnProperty(interval) &&
          timeIntervals[interval].includes(hour)
        ) {
          temperatureData[interval].push(item.main.temp);
        }
      }
    });

    const temperatureAverages = [];
    for (const interval in temperatureData) {
      if (temperatureData.hasOwnProperty(interval)) {
        const temps = temperatureData[interval];
        const avgTemp = temps.reduce((acc, val) => acc + val, 0) / temps.length;
        temperatureAverages.push(avgTemp);
      }
    }

    this.temperatureChartData = [
      { data: temperatureAverages, label: 'Average Temperature' },
    ];

    console.log(this.temperatureChartData);
    this.chartData = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Morning', 'Afternoon', 'Evening', 'Night'],

        datasets: [
          {
            data: temperatureAverages,
            borderWidth: 1,
            fill: false,
            borderColor: 'white',

            label: 'Temperature',

            pointRadius: 4,
            indexAxis: 'x',
            tension: 0.3,
          },
        ],
      },

      options: {
        scales: {
          y: {
            display: false,
          },
          x: {
            ticks: {
              color: 'white',
              font: {
                size: 10,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }
}

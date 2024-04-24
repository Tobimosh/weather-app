import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { PLATFORM_ID } from '@angular/core';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let spinnerServiceSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', [
      'show',
      'hide',
      'getSpinner',
    ]);

    await TestBed.configureTestingModule({
      imports: [MapComponent, CommonModule, NgxSpinnerModule],
      providers: [
        NgxSpinnerService,
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
        {
          provide: NgxSpinnerService,
          useValue: spinnerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map if platform is browser', () => {
    spyOn(component, 'initMap');
    component.ngAfterViewInit();
    if (isPlatformBrowser(PLATFORM_ID)) {
      expect(component.initMap).toHaveBeenCalled();
    }
  });

  it('should get user location', async () => {
    spyOn(component, 'getLocation').and.callThrough();
    component.ngAfterViewInit();
    expect(component.getLocation).toHaveBeenCalled();
  });

  it('should load map when there is location', () => {
    spinnerServiceSpy = TestBed.inject(
      NgxSpinnerService
    ) as jasmine.SpyObj<NgxSpinnerService>;

    const position = {
      coords: {
        latitude: 10,
        longitude: 20,
        accuracy: 30,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    };

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (successCallback) => {
        successCallback(position);
      }
    );

    component.getLocation();


  });
});

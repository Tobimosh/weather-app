import { Location } from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { routes } from './app.routes';

describe('AppRoutes', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to "five-days-forecast" route', waitForAsync(() => {
    router.navigate(['/five-days-forecast']).then(() => {
      expect(location.path()).toBe('/five-days-forecast');
    });
  }));

  it('should navigate to default route when path is empty', waitForAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).not.toBe('/five-days-forecast');
    });
  }));

  it('should navigate to NotFoundComponent for invalid route', waitForAsync(() => {
    router.navigate(['invalid-route']).then(() => {
      expect(location.path()).toBe('/invalid-route');
      expect(location.path()).toEqual('/invalid-route');
    });
  }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { ContainerComponent } from '../../container/container.component';
import { TimeComponent } from '../../time/time.component';
import { DaysComponent } from './days.component';

describe('DaysComponent', () => {
  let component: DaysComponent;
  let fixture: ComponentFixture<DaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DaysComponent,
        ContainerComponent,
        TimeComponent,
        RouterLink,
        CommonModule,
        RouterModule.forRoot(routes)
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(DaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

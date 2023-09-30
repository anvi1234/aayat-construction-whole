import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceDashboardComponent } from './attendence-dashboard.component';

describe('AttendenceDashboardComponent', () => {
  let component: AttendenceDashboardComponent;
  let fixture: ComponentFixture<AttendenceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

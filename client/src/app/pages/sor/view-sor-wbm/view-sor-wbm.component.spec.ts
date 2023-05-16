import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSorWbmComponent } from './view-sor-wbm.component';

describe('ViewSorWbmComponent', () => {
  let component: ViewSorWbmComponent;
  let fixture: ComponentFixture<ViewSorWbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSorWbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSorWbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

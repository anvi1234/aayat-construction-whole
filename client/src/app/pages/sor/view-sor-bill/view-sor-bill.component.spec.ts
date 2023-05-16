import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSorBillComponent } from './view-sor-bill.component';

describe('ViewSorBillComponent', () => {
  let component: ViewSorBillComponent;
  let fixture: ComponentFixture<ViewSorBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSorBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSorBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

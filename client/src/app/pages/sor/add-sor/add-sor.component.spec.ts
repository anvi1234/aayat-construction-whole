import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSorComponent } from './add-sor.component';

describe('AddSorComponent', () => {
  let component: AddSorComponent;
  let fixture: ComponentFixture<AddSorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

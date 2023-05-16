import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemdemceListComponent } from './attemdemce-list.component';

describe('AttemdemceListComponent', () => {
  let component: AttemdemceListComponent;
  let fixture: ComponentFixture<AttemdemceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttemdemceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemdemceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

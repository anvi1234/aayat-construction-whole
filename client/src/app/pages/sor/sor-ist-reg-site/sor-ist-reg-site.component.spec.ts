import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorIstRegSiteComponent } from './sor-ist-reg-site.component';

describe('SorIstRegSiteComponent', () => {
  let component: SorIstRegSiteComponent;
  let fixture: ComponentFixture<SorIstRegSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorIstRegSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorIstRegSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

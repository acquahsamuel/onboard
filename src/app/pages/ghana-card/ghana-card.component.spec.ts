import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhanaCardComponent } from './ghana-card.component';

describe('GhanaCardComponent', () => {
  let component: GhanaCardComponent;
  let fixture: ComponentFixture<GhanaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhanaCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhanaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

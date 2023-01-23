/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GenericStepperComponent } from './generic-stepper.component';

describe('GenericStepperComponent', () => {
  let component: GenericStepperComponent;
  let fixture: ComponentFixture<GenericStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

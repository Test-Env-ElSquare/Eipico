import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStepperComponent } from './password-stepper.component';

describe('PasswordStepperComponent', () => {
  let component: PasswordStepperComponent;
  let fixture: ComponentFixture<PasswordStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

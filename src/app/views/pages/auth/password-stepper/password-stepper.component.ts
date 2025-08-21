import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-password-stepper',
  templateUrl: './password-stepper.component.html',
  styleUrls: ['./password-stepper.component.scss'],
})
export class PasswordStepperComponent implements OnInit {
  visible = true;
  currentStep = 1;
  password = '';
  userEmail: string = '';
  displayResetPassword: boolean = true;
  @Output() emailCaptured: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  goToStep(step: number) {
    this.currentStep = step;
  }

  hasUpperCase() {
    return /[A-Z]/.test(this.password);
  }

  hasLowerCase() {
    return /[a-z]/.test(this.password);
  }

  hasNumber() {
    return /[0-9]/.test(this.password);
  }

  hasSpecialChar() {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  }

  minLength() {
    return this.password.length >= 8;
  }
}

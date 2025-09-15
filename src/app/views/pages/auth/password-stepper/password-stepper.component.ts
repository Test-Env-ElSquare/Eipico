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

  @Output() emailCaptured: EventEmitter<string> = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  displayPasswordStepper: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  goToStep(step: number) {
    this.currentStep = step;
    console.log(this.currentStep);
  }

  isCompleted(step: number): boolean {
    return step < this.currentStep;
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
  closePasswordStepper() {
    this.displayPasswordStepper = false;
  }
  onClose() {
    this.close.emit();
  }
}

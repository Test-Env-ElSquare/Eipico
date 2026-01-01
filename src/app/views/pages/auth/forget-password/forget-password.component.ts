import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/Auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  displayOtpPopup = false;
  @Output() emailCaptured: EventEmitter<string> = new EventEmitter<string>();

  @Output() nextStep = new EventEmitter<void>();

  visible: boolean = false;
  currentStep = 1;
  email: string = '';
  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private messageService: MessageService,
    private Router: Router
  ) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}
  next() {
    this.nextStep.emit();
  }
  goToMain() {
    this.Router.navigate(['/MainDash']);
  }
  goToStep(step: number) {
    this.currentStep = step;
  }
  showDialog() {
    this.visible = true;
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Send OTP',
      detail: 'Please chack your email',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error Sending OTP',
      detail: 'Email is invalid',
    });
  }
  openOtpPopup() {
    this.displayOtpPopup = true;
  }
  onSendOtp() {
    if (this.forgetForm.valid) {
      const email = this.forgetForm.value.email;
      this._AuthService.forgetPassword({ email }).subscribe({
        next: (res) => {
          // this.emailCaptured.emit(this.forgetForm.value.email);
          // this.next.emit();
          this.email = email;
          this.emailCaptured.emit(email);
          // this.email = this.forgetForm.value.email;
          console.log(' Success Response:', res);
          this.showSuccess();
          this.nextStep.emit();
        },
        error: (err) => {
          console.log(' Error Response:', err);
          this.showError();
        },
      });
    } else {
      this.forgetForm.markAllAsTouched();
    }
  }
}

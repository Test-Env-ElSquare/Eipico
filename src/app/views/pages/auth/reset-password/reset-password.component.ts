import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/Auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  @Input() email!: string;
  @Output() done = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  prev() {
    this.prevStep.emit();
  }
  resetForm: FormGroup;
  constructor(
    private _Router: Router,
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private messageService: MessageService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      newPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  onResetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    // const newPassword = this.resetForm.get('newPassword')?.value;
    // const confirmPassword = this.resetForm.get('confirmPassword')?.value;

    // this.passwordMismatch = false;
    // console.log(' Password ready to send:', newPassword);
    // this.passwordMismatch = false;

    const payload = {
      email: this.email,
      otp: this.resetForm.get('otp')?.value,
      newPassword: this.resetForm.get('newPassword')?.value,
    };
    this._AuthService.resetPassword(payload).subscribe({
      next: (res) => {
        this.done.emit();
        this._Router.navigate(['/auth/login']);
        console.log('Success Response:', res);
        this.showSuccess();
      },
      error: (err) => {
        console.log('Error Response:', err);
        this.showError();
      },
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Update Password is successful',
      detail: 'Your Password is Updated',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Password Error',
      detail: 'Password is not updated',
    });
  }
  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
}

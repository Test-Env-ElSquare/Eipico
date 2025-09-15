import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  displayOtpDialog: boolean = true;
  displayResetPassword: boolean = false;
  @Input() email!: string;

  otpForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private messageService: MessageService
  ) {}

  next() {
    this.nextStep.emit();
  }
  prev() {
    this.prevStep.emit();
  }
  ngOnInit(): void {
    this.otpForm = this.fb.group({
      digits: this.fb.array(
        Array(6)
          .fill(null)
          .map(() => this.fb.control('', Validators.required))
      ),
    });
  }

  get digits(): FormArray {
    return this.otpForm.get('digits') as FormArray;
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Send OTP',
      detail: 'Please check your email',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error Sending OTP',
      detail: 'Email is invalid',
    });
  }
  onVerify() {
    if (this.otpForm.invalid) {
      return;
    }

    const otpCode = this.digits.value.join('');
    const payload = { email: this.email, otp: otpCode };

    console.log('Payload:', payload);

    this._AuthService.sendOtp(payload).subscribe({
      next: () => {
        this.displayResetPassword = true;
        // this.verified.emit(),
        this.nextStep.emit();
        this.showSuccess();
      },
      error: () => this.showError(),
    });
  }

  moveNext(event: any, index: number) {
    const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
    if (
      event.inputType !== 'deleteContentBackward' &&
      event.target.value &&
      index < inputs.length - 1
    ) {
      inputs[index + 1].focus();
    }
    if (
      event.inputType === 'deleteContentBackward' &&
      !event.target.value &&
      index > 0
    ) {
      inputs[index - 1].focus();
    }
  }

  ngAfterViewInit() {
    const firstInput = document.querySelector<HTMLInputElement>('.otp-input');
    if (firstInput) firstInput.focus();
  }
}

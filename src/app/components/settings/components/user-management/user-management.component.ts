import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IFactory, roles } from '../../models/model';
import { UserManagementService } from '../../services/user-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  form: FormGroup;
  roles: roles[];
  factoryList: IFactory[];
  isRoleAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'
          ),
        ],
      ],
      roleName: ['', Validators.required],
    });
  }

  getRoles() {
    this.userManagementService.getRoles().subscribe({
      next: (data: any) => {
        this.roles = data;
      },
    });
  }

  addUser() {
    const userForm = this.form.value;
    this.userManagementService.addUser(userForm).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.form.reset();
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message);
        this.form.reset();
      },
    });
  }
}

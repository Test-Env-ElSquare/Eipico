import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { HoverLoginDirective } from 'src/app/core/directives/hover-login.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { ToastModule } from 'primeng/toast';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { CodePreviewModule } from '../../partials/code-preview/code-preview.module';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ButtonModule } from 'primeng/button';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      { path: 'view-profile', component: ViewProfileComponent },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    HoverLoginDirective,
    LoadingComponent,
    ViewProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CodePreviewModule,
    NgbModule,
    PerfectScrollbarModule,
    FeatherIconModule,
    StepsModule,
    NgSelectModule,
    DropdownModule,
    ButtonModule,
  ],
})
export class AuthModule {}

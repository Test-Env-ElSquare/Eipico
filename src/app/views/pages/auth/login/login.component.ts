import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/Auth.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  islognIn = true;
  isloading = false;
  returnUrl: any;
  errblock: boolean = false;
  ShowErr: boolean = false;
  messageLogin: any = 'Welcome to Genie Sphere MES System';
  expToken: any;
  tokenPayload: any;
  expirationDate: any;
  showPassword: boolean = false;
  displayPasswordStepper = false;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    particlesJS('particles-js', {
      particles: {
        number: { value: 75, density: { enable: true, value_area: 1000 } },
        color: { value: '#ffffff' },
        shape: {
          type: 'circle',
          stroke: { width: 0, color: '#000000' },
          polygon: { nb_sides: 5 },
          image: { src: 'img/github.svg', width: 100, height: 100 },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.clear();
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  showPasswordStepper() {
    this.displayPasswordStepper = true;
  }
  onLoggedin(loginForm: any) {
    if (!loginForm.valid) return;

    this.isloading = true;
    this.robot();

    this.AuthService.Login(loginForm.value).subscribe({
      next: (res) => {
        if (true) {
          console.log(res.token);
          this.isloading = false;

          const decodedToken = this.AuthService.decodeToken(res.token);

          // store both raw & decoded token separately
          localStorage.setItem('Token', res.token);
          localStorage.setItem('TokenDecoded', JSON.stringify(decodedToken));
          console.log('token');
          // optionally store user object if API returns it
          // localStorage.setItem('user', JSON.stringify(res.user));

          this.AuthService.userClaims = decodedToken;
          localStorage.setItem('isLoggedin', 'true');

          this.router.navigate([this.returnUrl]);
        } else {
          console.error('Login error: Invalid response message');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errblock = true;
        this.ShowErr = true;
        this.isloading = false;
        this.toastr.error(err.error.message);
        this.messageLogin = err.error.message;
        this.robot();
      },
    });
  }

  //rebot talking function
  robot() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = this.messageLogin;
    msg.rate = 1;
    speechSynthesis.speak(msg);
  }
}

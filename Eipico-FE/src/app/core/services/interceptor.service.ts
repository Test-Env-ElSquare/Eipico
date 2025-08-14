import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token')?.trim();

    console.log('Token from localStorage:', token);
    console.log('Request URL:', req.url);

    const reqCopy = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    this.loader.loader.next(true);

    return next.handle(reqCopy).pipe(
      finalize(() => this.loader.loader.next(false)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('isLoggedin');
          this.router.navigate(['/auth/login']);
        } else {
          this.router.navigate([
            `/error/${error.status}`,
            {
              type: error.error.type,
              title: error.error.tilte,
              desc: error.error.desc,
            },
          ]);
        }
        return throwError(() => error);
      })
    );
  }
}
// {
//   const APi_token = localStorage.getItem('Token');
//   const reqCopy = request.clone({setHeaders:{
//     Authorization:`Bearer ${APi_token}`}
//   })
//   return next.handle(reqCopy);
// }

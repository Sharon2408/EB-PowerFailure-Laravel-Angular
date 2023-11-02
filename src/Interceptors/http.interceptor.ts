import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RegistrationService } from 'src/Services/registration.service';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {

  constructor(private register: RegistrationService,private alert:MessageService,private router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Token to send with each Api request
    const authToken = localStorage.getItem('token');
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    }
    // To handle the Http Response
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      //Status code To check for authourized users
      if (error.status == 401) {
        this.alert.add({
          key: 'tc',
          severity: 'error',
          summary: 'Your session has expired',
          detail:'Please Login Again',
        })
        this.register.logout();
      }
         //Status code To check if  Backend validation fails
      else if(error.status == 422){
        this.alert.add({
          key: 'tc',
          severity: 'error',
          summary: 'Email exists',
          detail: 'Looks like you have already registered this Credentials',
        });
          this.router.navigate(['admin-view-complaints']);
      }
         //Status code 500 if some unexpected error happens in the database
      else if(error.status == 500){
      this.alert.add({
        key: 'tc',
        severity: 'error',
        summary: 'Invalid Credentials',
        detail: 'email or password does not match',
      });
    }
      return throwError('Error Ooccured' + error.message)
    }));
  }
}

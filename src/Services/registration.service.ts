import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Authorisation, Registration, Login } from 'src/Models/registration';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }
  // Api Base Url
  baseUrl = environment.baseUrl;

  user_name!: string;
  userId!: number;
  consumerId!: string;
  roleId!: number;
  token: string | null = localStorage.getItem('token')

  // To get the current logged in status to hide the Navitems in the Navbar
  public islogged = new BehaviorSubject<boolean>(this.get())
  authStatus = this.islogged.asObservable();

  // To change the auth status when the user log's out
  changeAuthStatus(value: boolean) {
    this.islogged.next(value);
  }
// function to register users
  signUp(form: Registration) {
    return this.http.post<Registration[]>(`${this.baseUrl}/user-register`, form).subscribe(
      {
        next: (res) => {
          this.alert.add({
            key: 'tc',
            severity: 'success',
            summary: 'User Created Successfully',
          });
          console.log(res)
          this.router.navigate(['/'])
        },
      }
    );
  }

// To handle Login of Users,Admin and Lineman
  login(form: Registration) {
    if (form.loginType === 'user') {
      return this.http.post<Login>(`${this.baseUrl}/user-login`, form).subscribe(
        {
          next: (res) => {
            this.set(res.authorisation);
            this.get();
            this.changeAuthStatus(true)
            this.alert.add({
              key: 'tc',
              severity: 'success',
              summary: 'Welcome' + ' ' + this.user_name,
            });
            if (form.loginType === 'user') {
              this.router.navigate(['']);
            } else {
              this.router.navigate(['admin-view-complaints']);
            }
          },
        }
      );
    }
    else if (form.loginType === 'lineman') {
      return this.http.post<Login>(`${this.baseUrl}/lineman-login`, form).subscribe(
        {
          next: (res) => {
            this.set(res.authorisation);
            this.get();
            this.changeAuthStatus(true)
            this.alert.add({
              key: 'tc',
              severity: 'success',
              summary: 'Welcome' + ' ' + this.user_name,
            });
            this.router.navigate(['lineman-view-task']);
          },
        }
      );
    }
    return false;
  }
// To set the Access token
  set(token: Authorisation) {
    localStorage.setItem('token', token.token);
  }
// Function to get the access token
  get() {
    const token = localStorage.getItem('token');
    if (token) {
      const decryptToken = token.split('.')[1];
      const decode = JSON.parse(atob(decryptToken));
      if (decode) {
        this.user_name = decode.name;
        this.roleId = decode.role_id;
        this.userId = parseInt(decode.sub);
        this.consumerId = decode.consumer_id
      }
      return true
    }
    return false;
  }
// Logout function to clear the access token
  logout(){
    localStorage.clear();
    this.changeAuthStatus(false);
    this.router.navigate(['login']);
  }
}

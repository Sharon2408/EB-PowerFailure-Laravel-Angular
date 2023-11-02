import { Component, DoCheck, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/Services/registration.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements DoCheck {
  loggedIn!: boolean;
  userName!: string | null;
  role!: number;

  constructor(private register: RegistrationService, private router: Router) {
    this.register.authStatus.subscribe(value => this.loggedIn = value);
  }

  ngDoCheck(): void {
        this.userName = this.register.user_name;
        this.role = this.register.roleId;
        this.register.authStatus.subscribe(value => this.loggedIn = value);
        
  }


  logout() {
   this.register.logout();
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/shared/ErrorMatcher';
import { RegistrationService } from 'src/Services/registration.service';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private registeration: RegistrationService,
  ) {

  }

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  loginType!:FormControl;

  hide = true;

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.loginType = new FormControl('',[Validators.required]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
      loginType:this.loginType
    });


  }
  matcher = new MyErrorStateMatcher();


  onSubmit() {
    return this.registeration.login(this.loginForm.value);
  }


}

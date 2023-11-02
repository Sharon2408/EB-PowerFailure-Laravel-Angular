import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/shared/ErrorMatcher';
import { RegistrationService } from 'src/Services/registration.service';
import { matchValidator } from 'src/shared/confirmPassword';
import { ComplaintService } from 'src/Services/complaint.service';
import { Area, District, Zone } from 'src/Models/complaint';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(

    private registeration: RegistrationService,
    private complaint: ComplaintService
  ) { }

  signupForm!: FormGroup;
  district!: FormControl;
  zone!: FormControl;
  area!: FormControl;
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirm_password!: FormControl;
  phoneno!: FormControl;
  connectionNumber!: FormControl;
  hide = true;
  c_hide = true;
  matcher = new MyErrorStateMatcher();
  selectedDistrict!: number;
  selectedZone!: number;
  districtCode!: string;
  zoneCode!: string;
  areaCode!: string;
  consumerId!: string;
  connectionNo!: string;
  user_id!: number;

  // Dropdown data
  districts: District[] = [];
  zones: Zone[] = [];
  areas: Area[] = [];


  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);

    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      ),
    ]);

    this.confirm_password = new FormControl('', [
      Validators.required,
      matchValidator('password'),
    ]);

    this.phoneno = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^[0-9]{10}$'
      ),
    ]);

    this.district = new FormControl('', [Validators.required]);
    this.zone = new FormControl('', [Validators.required]);
    this.area = new FormControl('', [Validators.required]);
    this.connectionNumber = new FormControl('', [Validators.required,Validators.pattern(
      '^[0-9]{2}$'
    ),]);

    this.complaint.getDistrict().subscribe((response) => {
      this.districts = response;
    })

    this.signupForm = new FormGroup({
      district: this.district,
      zone: this.zone ,
      area: this.area,
      name: this.name,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirm_password,
      phoneno: this.phoneno,
      connectionNumber:this.connectionNumber
      
    });
  }

  onSubmit() {
    console.log(this.signupForm.value)
    this.consumerCode();
    this.signupForm.value.consumer_id = this.consumerId
    return this.registeration.signUp(this.signupForm.value);
  }

  getZone(code: string) {
    if (this.selectedDistrict) {
      this.complaint.getZone().subscribe((response) => {
        this.zones = response;
        this.districtCode = code;
      })
    }
    else {
      this.zones = [];
    }
  }

  getArea(code: string) {
    if (this.selectedZone) {
      this.complaint.getArea().subscribe((response) => {
        this.areas = response;
        this.zoneCode = code;
      })
    }
    else {
      this.areas = [];
    }
  }

  getAreaCode(code: string) {
    this.areaCode = code;
  }

  consumerCode() {
    this.consumerId = this.districtCode + this.zoneCode + this.areaCode + this.connectionNo;

  }
}




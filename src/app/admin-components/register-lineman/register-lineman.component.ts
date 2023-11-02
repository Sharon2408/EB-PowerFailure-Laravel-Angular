import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Area, District, Zone } from 'src/Models/complaint';
import { ComplaintService } from 'src/Services/complaint.service';
import { RegistrationService } from 'src/Services/registration.service';
import { MyErrorStateMatcher } from 'src/shared/ErrorMatcher';
import { matchValidator } from 'src/shared/confirmPassword';
import { LinemanService } from 'src/Services/lineman.service';
@Component({
  selector: 'app-register-lineman',
  templateUrl: './register-lineman.component.html',
  styleUrls: ['./register-lineman.component.css']
})
export class RegisterLinemanComponent {

  constructor(

    private linemanRegisteration: LinemanService,
    private complaint: ComplaintService
  ) { }

  lineManForm!: FormGroup;
  district!: FormControl;
  zone!: FormControl;
  area!: FormControl;
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirm_password!: FormControl;
  phoneno!: FormControl;
  linemanNumber!: FormControl;
  hide = true;
  c_hide = true;
  matcher = new MyErrorStateMatcher();
  selectedDistrict!: number;
  selectedZone!: number;
  districtCode!: string;
  zoneCode!: string;
  areaCode!: string;
  linemanId!: string;
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

    this.complaint.getPlace('District').subscribe((response) => {
      this.districts = response;
    })

    this.lineManForm = new FormGroup({
      district: this.district,
      zone: this.zone ,
      area: this.area,
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      phone_no: this.phoneno,
     
      
    });
  }

  onSubmit() {
    this.linemanCode();
    this.lineManForm.value.lineman_id = this.linemanId
    return this.linemanRegisteration.linemanRegistration(this.lineManForm.value);
  }

  getZone(code: string) {
    if (this.selectedDistrict) {
      this.complaint.getPlace('Zone').subscribe((response) => {
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
      this.complaint.getPlace('Area').subscribe((response) => {
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

  linemanCode() {
    this.linemanId = this.districtCode + this.zoneCode + this.areaCode;

  }
}

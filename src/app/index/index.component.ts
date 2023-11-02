import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/Services/registration.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private register: RegistrationService) {
  }
  roleId!: number;
  ngOnInit(): void {
    this.roleId = this.register.roleId
  }
}

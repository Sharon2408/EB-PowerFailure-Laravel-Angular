import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from 'src/Services/complaint.service';
import { RegistrationService } from 'src/Services/registration.service';
import { MyErrorStateMatcher } from 'src/shared/ErrorMatcher';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  constructor(private complaint: ComplaintService,private register:RegistrationService) {
  }
  // Form Controls
  complaintForm!: FormGroup;
  issue_details!: FormControl;
  landmark!: FormControl;

  user_id!: number;
  currentConsumerNo!: string;

  ngOnInit(): void {
    this.user_id = this.register.userId;
    this.currentConsumerNo = this.register.consumerId;
    this.complaintForm = new FormGroup({
      issue_details: new FormControl('', [Validators.required]),
      landmark: new FormControl('', [Validators.required]),
    });
  }
  matcher = new MyErrorStateMatcher();
  onSubmit() {
    this.complaintForm.value.consumer_id = this.currentConsumerNo
    this.complaintForm.value.user_id = this.user_id
    return this.complaint.postComplaint(this.complaintForm.value);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { District, Zone, Area, Complaint } from 'src/Models/complaint';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }
  baseUrl = environment.baseUrl;

  getDistrict() {
    return this.http.get<District[]>(`${this.baseUrl}/district`);
  }

  getZone() {
    return this.http.get<Zone[]>(`${this.baseUrl}/zone`);
  }

  getArea() {
    return this.http.get<Area[]>(`${this.baseUrl}/area`);
  }

  postComplaint(form: Complaint) {
    console.log(form)
    return this.http.post<Complaint[]>(`${this.baseUrl}/usercomplaints`, form).subscribe({

      next: () => {
        this.alert.add({
          key: 'tc',
          severity: 'success',
          summary: 'Thank you',
          detail: 'Your Complaint has been registerd'
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000)

      },
      error: (error) => {
        if (error.status === 404) {
        this.alert.add({
          key: 'tc',
          severity: 'error',
          summary: 'Consumer Id',
          detail: 'Consumer Id doesnt match'
        });
      }
      else{
        this.alert.add({
          key: 'tc',
          severity: 'error',
          summary: 'Oops',
          detail: 'Something went wrong'
        });
      }
    }
    });
  }

 
}

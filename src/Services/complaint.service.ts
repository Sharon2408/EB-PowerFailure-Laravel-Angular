import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { District, Zone, Area, Complaint } from 'src/Models/complaint';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }
  baseUrl = environment.baseUrl;

  // To get all districts
  getDistrict() {
    return this.http.get<District[]>(`${this.baseUrl}/district`);
  }
// To get all zones
  getZone() {
    return this.http.get<Zone[]>(`${this.baseUrl}/zone`);
  }
// To get all areas
  getArea() {
    return this.http.get<Area[]>(`${this.baseUrl}/area`);
  }
// To store the user registered complaint at the backend()
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
        this.router.navigate(['user-complaints']);
      },
    });
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, } from 'rxjs';
import { Linemen, Task, Updatestatus, status, } from 'src/Models/linemen';
import { Registration } from 'src/Models/registration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinemanService {
  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }
  // The base url of the Api
  baseUrl = environment.baseUrl;

  // Behavior Subject to get the current complaintId
  complaint_id = new BehaviorSubject<number>(0);
  currentComplaintId = this.complaint_id.asObservable();
  
  // Lineman Registration
  linemanRegistration(form: Registration) {
    return this.http.post<Registration[]>(`${this.baseUrl}/lineman-register`, form).subscribe(
      {
        next: () => {
          this.alert.add({
            key: 'tc',
            severity: 'success',
            summary: 'lineman registered Successfully',
          });
          this.router.navigate(['admin-view-complaints']);
        },
      }
    );
  }

  // To find the lineman area wise
  find(lineman_id: string) {
    const id = lineman_id.substring(0, 9)
    return this.http.get<Linemen[]>(`${this.baseUrl}/lineman/` + id);
  }

  // To assign the task to Lineman
  assignTasktoLineman(task: Task) {
    return this.http.post<Task>(`${this.baseUrl}/assign-task`, task).subscribe({
      next: () => {
        this.alert.add({
          key: 'tc',
          severity: 'success',
          summary: 'Task Assigned',
        });
      }
    });
  }

  // To get the status of the complaints assigned
  getStatus() {
    return this.http.get<status[]>(`${this.baseUrl}/get-status`)
  }

// To update the status of the task assigned to the lineman
  updateStatus(status: Updatestatus) {
    return this.http.patch(`${this.baseUrl}/update-status`, status).subscribe({
      next: () => {
        this.alert.add({
          key: 'tc',
          severity: 'success',
          summary: 'Status Updated',
        });
      }
    });
  }
  
// To give the completed date when the status is updated to completed
  updateSolvedDate(status: Updatestatus) {
    return this.http.put(`${this.baseUrl}/solved-date`, status).subscribe()
  }

}

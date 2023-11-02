import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, DomLayoutType, GridApi, ICellRendererParams, RowHeightParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Complaint } from 'src/Models/complaint';
import { RegistrationService } from 'src/Services/registration.service';
import { AssignbuttonComponent } from 'src/app/button-components/view-lineman-button/view-lineman-button.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-registered-complaints',
  templateUrl: './user-registered-complaints.component.html',
  styleUrls: ['./user-registered-complaints.component.css']
})
export class UserRegisteredComplaintsComponent implements OnInit {
  gridApi!: GridApi;
  public domLayout: DomLayoutType = 'autoHeight';

  constructor(private http: HttpClient, private datePipe: DatePipe, private register: RegistrationService) { }
  baseUrl = environment.baseUrl;
  rowData$!: Observable<Complaint[]>;
  user_id!: number;

  ngOnInit(): void {
    this.user_id = this.register.userId;
    this.rowData$ = this.http.get<Complaint[]>(`${this.baseUrl}/user-registered-complaints/` + this.user_id)
  }
  colDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'consumer_id', headerName: 'Consumer Id', },
    { field: 'issue_details', headerName: 'Issue Details', },
    { field: 'landmark', headerName: 'Land Mark', },
    {
      field: 'complained_date', headerName: 'Complained Date', cellRenderer: (params: ICellRendererParams) => {
        return `<p>${this.datePipe.transform(params.value)}</p>`;
      },
    },
    { field: 'status', headerName: 'Status', },
    { field: 'solved_date', headerName: 'Solved Date', },

  ];

  defaultColDef: ColDef = {
    sortable: true, filter: true,
    flex: 1,
    minWidth: 250,
    resizable: true,
  }

  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
    (document.querySelector<HTMLElement>('#myGrid')! as any).style.height = '';
  }
  public getRowHeight: (
    params: RowHeightParams
  ) => number | undefined | null = (params: RowHeightParams) => {
    if (params.node.level === 0) {
      return 60;
    }
    if (params.node.level === 1) {
      return 60;
    }
    return 40;
  };
}

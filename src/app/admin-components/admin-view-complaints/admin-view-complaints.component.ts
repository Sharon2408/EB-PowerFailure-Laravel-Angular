import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef, DomLayoutType, GridApi, ICellRendererParams, RowHeightParams } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { Complaint } from 'src/Models/complaint';
import { AssignbuttonComponent } from '../../button-components/view-lineman-button/view-lineman-button.component';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-view-complaints',
  templateUrl: './admin-view-complaints.component.html',
  styleUrls: ['./admin-view-complaints.component.css']
})
export class AdminViewComplaintsComponent implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  // Base Url of Api
  baseUrl = environment.baseUrl;
  // array to store the all the complaints and view in the Aggrid component
  rowData: Complaint[] = [];
  // Too adjust the height of the table on different screens
  public domLayout: DomLayoutType = 'autoHeight';
  private gridApi!: GridApi;

// To set the values of the response to the specified columns
  colDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'consumer_id', headerName: 'Consumer Id', },
    { field: 'issue_details', headerName: 'Issue Details', },
    { field: 'landmark', headerName: 'Land Mark', },
    {
      headerName: 'View Lineman', cellRenderer: AssignbuttonComponent,// Assign Button Component to assign the task to the Lineman
      cellRendererParams: (params: ICellRendererParams) => ({
        consumerId: params.data.consumer_id,
        complaintId: params.data.id,
      }),
    },
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
  ngOnInit(): void {
    this.http.get<Complaint[]>(`${this.baseUrl}/admincomplaints`).subscribe({
      next: (res) => { this.rowData = res }
    })
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
    else if (params.node.level === 1) {
      return 60;
    } else
      return 40;
  };

}


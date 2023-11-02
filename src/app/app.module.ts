import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// Components
import { AppComponent } from './app.component';
import { AssignbuttonComponent } from './button-components/view-lineman-button/view-lineman-button.component';
import { RegisterLinemanComponent } from './admin-components/register-lineman/register-lineman.component';
import { ViewAreaLinemanComponent } from './admin-components/view-area-lineman/view-area-lineman.component';
import { AssignTasktoLinemanButtonComponent } from './button-components/assign-taskto-lineman-button/assign-taskto-lineman-button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LoginComponent } from './auth-components/login/login.component';
import { ComplaintsComponent } from './user-components/user-complaints-register/complaints.component';
import { IndexComponent } from './index/index.component';
import { AdminViewComplaintsComponent } from './admin-components/admin-view-complaints/admin-view-complaints.component';

// Material UI
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


// Primeng
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


// AG Grid
import { AgGridModule } from 'ag-grid-angular';
import { LinemanViewTaskComponent } from './lineman-components/lineman-view-task/lineman-view-task.component';
import { UpdateStatusRendererComponent } from './lineman-components/update-status-renderer/update-status-renderer.component';
import { DatePipe } from '@angular/common';
import { UserRegisteredComplaintsComponent } from './user-components/user-registered-complaints/user-registered-complaints.component';
import {  HttpInterceptors } from 'src/Interceptors/http.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    LoginComponent,
    ComplaintsComponent,
    IndexComponent,
    AdminViewComplaintsComponent,
    AssignbuttonComponent,
    RegisterLinemanComponent,
    ViewAreaLinemanComponent,
    AssignTasktoLinemanButtonComponent,
    LinemanViewTaskComponent,
    UpdateStatusRendererComponent,
    UserRegisteredComplaintsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    AgGridModule
  ],
  providers: [
    MessageService, DatePipe,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpInterceptors,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

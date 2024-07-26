import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BureauComponent } from './bureau/bureau.component';
import { PlateauComponent } from './plateau/plateau.component';
import { LoginComponent } from './login/login.component';
import {DatepickerCustomHeaderExample} from './datepicker-custom-header/datepicker-custom-header.component';
import { AppRoutingModule } from './app-routing.module';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { customInterceptor } from './services/custom.interceptor';







@NgModule({
  declarations: [
    PlateauComponent,
    BureauComponent,
    PopupComponent,
    
    DatepickerCustomHeaderExample
  
  ],
  imports: [
    AppComponent,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    AppRoutingModule, 
    LoginComponent,
  
   
   
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
    
  ],
  providers: [PositionService,
    {provide : HTTP_INTERCEPTORS, useClass :customInterceptor , multi : true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
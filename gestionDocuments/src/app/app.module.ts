import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DocumentComponent } from './document/document.component';
import { AjoutdocComponent } from './ajoutdoc/ajoutdoc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DossierComponent } from './dossier/dossier.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AjoutdosComponent } from './ajoutdos/ajoutdos.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    DocumentComponent,
    AjoutdocComponent,
    DossierComponent,
    DashboardComponent,
    AjoutdosComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

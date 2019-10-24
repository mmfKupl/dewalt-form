import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { AppRoutingModule } from './app-routing.module';
import { SenderComponent } from './sender/sender.component';
import { AddressComponent } from './address/address.component';
import { ToolsComponent } from './tools/tools.component';
import { DepartureComponent } from './departure/departure.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFireFunctionsModule,
  FUNCTIONS_ORIGIN
} from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { StartPageComponent } from './start-page/start-page.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DynamicFormQuestionComponent,
    SenderComponent,
    AddressComponent,
    ToolsComponent,
    DepartureComponent,
    ConfirmationPageComponent,
    StartPageComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
// { provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5001' }

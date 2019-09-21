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
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DynamicFormQuestionComponent,
    SenderComponent,
    AddressComponent,
    ToolsComponent,
    DepartureComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

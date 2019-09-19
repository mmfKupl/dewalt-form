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
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { SenderComponent } from './sender/sender.component';
import { ToolsComponent } from './tools/tools.component';
import { DepartureComponent } from './departure/departure.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'sender', component: SenderComponent },
  { path: 'address', component: AddressComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'departure', component: DepartureComponent },
  { path: 'confirmation', component: ConfirmationPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

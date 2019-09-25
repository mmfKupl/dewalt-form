import { Component, OnInit } from '@angular/core';
import { NavButtonsService } from './nav-buttons.service';
import { Subscription } from 'rxjs';
import { ButtonData } from './models/button-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  buttonsSubscriptin: Subscription;
  buttons: ButtonData[] = [];
  constructor(private navBtnService: NavButtonsService) {}

  ngOnInit() {
    this.buttonsSubscriptin = this.navBtnService.buttons$.subscribe(arr => {
      setTimeout(() => {
        this.buttons = arr.sort((a, b) => b.order - a.order);
      });
    });
  }

  getDisabled(i: number): boolean {
    const b = this.buttons[i];
    if (i === 3) {
    }
    return typeof b.disabled === 'function' ? b.disabled() : b.disabled;
  }
}

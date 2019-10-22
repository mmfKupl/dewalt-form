import { Component, OnInit } from '@angular/core';
import { ButtonData } from '../models/button-data';
import { SideComponentsServie } from '../side-components.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  buttons: ButtonData[] = [
    new ButtonData('далее', () => {}, false, '/sender', 1, true)
  ];
  constructor(private ncs: SideComponentsServie) {}

  ngOnInit() {
    this.ncs.setButtons(this.buttons);
  }
}

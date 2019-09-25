import { Injectable } from '@angular/core';
import { ButtonData } from './models/button-data';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavButtonsService {
  buttons$: BehaviorSubject<ButtonData[]> = new BehaviorSubject<ButtonData[]>(
    []
  );
  constructor() {}

  setButtons(buttons: ButtonData[]) {
    this.buttons$.next(buttons);
  }
}

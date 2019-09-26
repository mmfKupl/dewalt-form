import { Injectable } from '@angular/core';
import { ButtonData } from './models/button-data';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideComponentsServie {
  buttons$: BehaviorSubject<ButtonData[]> = new BehaviorSubject<ButtonData[]>(
    []
  );
  tools$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  currentToolIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  showTools$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toolClickHandler$: BehaviorSubject<any> = new BehaviorSubject<any>(
    (i: number) => {}
  );

  constructor() {}

  setButtons(buttons: ButtonData[]) {
    this.buttons$.next(buttons);
  }

  setTools(tools: any[]) {
    this.tools$.next(tools);
  }

  setCurrentToolIndex(index: number) {
    this.currentToolIndex$.next(index);
  }

  setShowTools(flag: boolean) {
    this.showTools$.next(flag);
  }

  setToolClickHandler(fn: any) {
    this.toolClickHandler$.next(fn);
  }
}

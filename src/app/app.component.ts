import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideComponentsServie } from './side-components.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ButtonData } from './models/button-data';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  buttonsSubscriptin: Subscription;
  buttons: ButtonData[] = [];
  toolsSubscriptin: Subscription;
  tools: any[] = [];
  currentToolIndexSubscription: Subscription;
  currentToolIndex: number;
  showToolsSubscription: Subscription;
  showTools = false;
  toolsClickHandlerSubscription: Subscription;
  toolsClickHandler = i => {};

  constructor(
    private scs: SideComponentsServie,
    private aut: AngularFireAuth
  ) {}

  ngOnInit() {
    this.aut.auth.signInAnonymously().catch(err => {
      console.error(err);
      alert(err.message);
    });
    this.buttonsSubscriptin = this.scs.buttons$.subscribe(arr => {
      setTimeout(() => {
        this.buttons = arr.sort((a, b) => b.order - a.order);
      });
    });
    this.toolsSubscriptin = this.scs.tools$.subscribe(arr => {
      setTimeout(() => {
        this.tools = arr;
      });
    });
    this.currentToolIndexSubscription = this.scs.currentToolIndex$.subscribe(
      ind => {
        setTimeout(() => {
          this.currentToolIndex = ind;
        });
      }
    );
    this.showToolsSubscription = this.scs.showTools$.subscribe(flag => {
      setTimeout(() => {
        this.showTools = flag;
      });
    });
    this.toolsClickHandlerSubscription = this.scs.toolClickHandler$.subscribe(
      fn => {
        setTimeout(() => {
          this.toolsClickHandler = fn;
        });
      }
    );
  }

  ngOnDestroy() {
    this.showToolsSubscription.unsubscribe();
    this.toolsSubscriptin.unsubscribe();
    this.buttonsSubscriptin.unsubscribe();
    this.currentToolIndexSubscription.unsubscribe();
    this.toolsClickHandlerSubscription.unsubscribe();
  }

  getDisabled(i: number): boolean {
    const b = this.buttons[i];
    return typeof b.disabled === 'function' ? b.disabled() : b.disabled;
  }
}

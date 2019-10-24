import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  message$: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.message$ = this.route.params.pipe(map(d => d.message));
  }

  close() {
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}

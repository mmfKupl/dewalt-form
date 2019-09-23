import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links: {
    path: string;
    title: string;
    order: number;
  }[];
  constructor(private router: Router, private qs: QuestionService) {}

  ngOnInit() {
    this.links = this.qs.getHeaders();
  }

  get currentNavigation() {
    return this.router.url;
  }
}

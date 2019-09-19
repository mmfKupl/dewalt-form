import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[];
  questionSubscription: Subscription;

  form: FormGroup;

  constructor(
    private questionService: QuestionService,
    private qcs: QuestionControlService
  ) {}

  ngOnInit() {
    this.questions = this.questionService.getAddress();
    this.form = this.qcs.toFormGroup(this.questions);
    this.questionSubscription = this.form.valueChanges.subscribe(
      values => (this.questionService.addressAnswer = { ...values })
    );
  }

  ngOnDestroy() {
    this.questionSubscription.unsubscribe();
  }
}

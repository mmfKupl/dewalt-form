import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[];
  questionSubscription: Subscription;

  form: FormGroup;

  constructor(
    private questionService: QuestionService,
    private qcs: QuestionControlService
  ) {}

  ngOnInit() {
    this.questions = this.questionService.getDeparture();
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.patchValue(this.questionService.departureAnswer);
    this.questionSubscription = this.form.valueChanges.subscribe(
      values => (this.questionService.departureAnswer = { ...values })
    );
  }

  get isValid() {
    return this.form.valid;
  }

  ngOnDestroy() {
    this.questionSubscription.unsubscribe();
  }

  onClick() {
    alert('подтвердить');
  }
}

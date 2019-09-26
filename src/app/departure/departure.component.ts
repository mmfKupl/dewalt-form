import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../models/question-base';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';
import { SideComponentsServie } from '../side-components.service';
import { ButtonData } from '../models/button-data';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[];
  questionSubscription: Subscription;

  form: FormGroup;

  buttons: ButtonData[] = [
    new ButtonData(
      'далее',
      () => {},
      () => {
        return this.form.invalid;
      },
      '/confirmation',
      1,
      true
    ),
    new ButtonData('назад', () => {}, false, '/tools', 2),
    new ButtonData(
      'очистить',
      () => {
        this.form.reset();
      },
      false,
      '',
      3,
      true
    )
  ];

  constructor(
    private questionService: QuestionService,
    private qcs: QuestionControlService,
    private scs: SideComponentsServie
  ) {}

  ngOnInit() {
    this.scs.setButtons(this.buttons);

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

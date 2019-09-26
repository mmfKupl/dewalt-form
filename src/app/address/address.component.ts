import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../models/question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';
import { SideComponentsServie } from '../side-components.service';
import { ButtonData } from '../models/button-data';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {
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
      '/tools',
      1,
      true
    ),
    new ButtonData('назад', () => {}, false, '/sender', 2),
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
    private ncs: SideComponentsServie
  ) {}

  ngOnInit() {
    this.ncs.setButtons(this.buttons);

    this.questions = this.questionService.getAddress();
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.patchValue(this.questionService.addressAnswer);

    this.questionSubscription = this.form.valueChanges.subscribe(values => {
      this.questionService.addressAnswer = { ...values };
    });
  }

  get isValid() {
    return this.form.valid;
  }
  ngOnDestroy() {
    this.questionSubscription.unsubscribe();
  }
}

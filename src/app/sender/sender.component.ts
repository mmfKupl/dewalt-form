import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../models/question-base';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { QuestionControlService } from '../question-control.service';
import { ButtonData } from '../models/button-data';
import { SideComponentsServie } from '../side-components.service';

interface OrderToElem {
  el: AbstractControl;
  orderTo: string;
  fixedLength: number;
}

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[];
  questionSubscription: Subscription;
  senderTypeSubscription: Subscription;

  form: FormGroup;

  buttons: ButtonData[] = [
    new ButtonData(
      'далее',
      () => {},
      () => {
        return this.form.invalid;
      },
      '/address',
      1,
      true
    ),
    new ButtonData(
      'очистить',
      () => {
        this.form.reset();
      },
      false,
      '',
      2,
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

    this.questions = this.questionService.getSender();
    this.form = this.qcs.toFormGroup(this.questions);

    this.form.patchValue(this.questionService.senderAnswer);
    const drd = this.questions.find(el => el.controlType === 'dropdown');

    if (this.questions.find(el => !!el.orderTo) && drd) {
      const arr: OrderToElem[] = [];
      for (const elem of this.questions) {
        if (elem.orderTo) {
          arr.push({
            el: this.form.get(elem.key),
            orderTo: elem.orderTo,
            fixedLength: elem.fixedLength
          });
        }
      }
      this.senderTypeSubscription = this.form
        .get(drd.key)
        .valueChanges.subscribe(valueData => {
          arr.forEach(el => {
            if (el.orderTo === valueData) {
              const vs = [Validators.required];
              if (el.fixedLength) {
                vs.push(Validators.minLength(el.fixedLength));
              }
              el.el.setValidators(vs);
            } else {
              el.el.setValidators(null);
            }
            el.el.reset();
            el.el.markAsTouched();
          });
        });
    }

    this.questionSubscription = this.form.valueChanges.subscribe(values => {
      this.questionService.senderAnswer = { ...values };
    });
  }

  get isValid() {
    return this.form.valid;
  }

  ngOnDestroy() {
    this.senderTypeSubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionControlService } from '../question-control.service';

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

  constructor(
    private questionService: QuestionService,
    private qcs: QuestionControlService
  ) {}

  ngOnInit() {
    this.questions = this.questionService.getSender();
    this.form = this.qcs.toFormGroup(this.questions);

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
        .valueChanges.subscribe(value => {
          arr.forEach(el => {
            if (el.orderTo === value) {
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

    this.form.patchValue(this.questionService.senderAnswer);
    this.questionSubscription = this.form.valueChanges.subscribe(
      values => (this.questionService.senderAnswer = { ...values })
    );
  }

  ngOnDestroy() {
    this.senderTypeSubscription.unsubscribe();
    this.questionSubscription.unsubscribe();
  }
}

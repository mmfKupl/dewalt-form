import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionControlService } from '../question-control.service';

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

    this.form.valueChanges.subscribe(v => console.log(v));

    const drd = this.questions.find(el => el.controlType === 'dropdown');

    if (this.questions.find(el => !!el.orderTo) && drd) {
      const arr = [];
      for (const elem of this.questions) {
        if (elem.orderTo) {
          arr.push({ el: this.form.get(elem.key), orderTo: elem.orderTo });
        }
      }
      this.senderTypeSubscription = this.form
        .get(drd.key)
        .valueChanges.subscribe(value => {
          arr.forEach(el => {
            if (el.orderTo === value) {
              el.el.setValidators(Validators.required);
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

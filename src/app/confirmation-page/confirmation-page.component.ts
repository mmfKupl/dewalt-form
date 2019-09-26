import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { SideComponentsServie } from '../side-components.service';
import { ButtonData } from '../models/button-data';
import { QuestionBase } from '../models/question-base';
import { GroupQuestion } from '../models/question-group';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  buttons: ButtonData[] = [
    new ButtonData(
      'отправить',
      () => {},
      () => {
        return true;
      },
      '',
      1,
      true
    ),
    new ButtonData('назад', () => {}, false, '/departure', 2)
  ];

  senderQuestions: QuestionBase<any>[] = [];
  addressQuestion: QuestionBase<any>[] = [];
  toolsQuestion: QuestionBase<any>[] = [];
  departureQuestion: QuestionBase<any>[] = [];

  constructor(private qs: QuestionService, private scs: SideComponentsServie) {}

  ngOnInit() {
    this.scs.setButtons(this.buttons);
    this.senderQuestions = this.qs.getSender();
    this.addressQuestion = this.qs.getAddress();
    this.toolsQuestion = this.qs.getTools();
    this.departureQuestion = this.qs.getDeparture();
  }

  reduceAnswer(answer: any | any[] = {}, questions: any[] = []) {
    if (Array.isArray(answer)) {
      const answers = [];

      answer.forEach(curAnswer => {
        answers.push(this.reduceAnswer(curAnswer, questions));
      });
      return answers;
    }
    return this.toArray(
      questions.reduce((p, c = {}) => {
        if (c instanceof GroupQuestion) {
          p = { ...p, ...this.reduceAnswer(answer, c.items) };
        } else {
          const ak = answer[c.key] || {};
          const value = typeof ak === 'object' ? ak.value : ak;
          p[c.key] = { value, label: c.label, order: c.order };
        }
        return p;
      }, {})
    );
  }

  toArray(object: object): object[] {
    const res = [];
    // tslint:disable-next-line: forin
    for (const key in object) {
      res.push({ ...object[key], key });
    }
    return res.sort((a, b) => a.order - b.order);
  }

  get senderAnswer() {
    const a = this.reduceAnswer(this.qs.senderAnswer, this.senderQuestions);
    console.log(a);
    return a;
  }

  get addressAnswer() {
    return this.reduceAnswer(this.qs.addressAnswer, this.addressQuestion);
  }
  get toolsAnswer() {
    const a = this.reduceAnswer(this.qs.toolsAnswer, this.toolsQuestion);
    console.log(a);
    return a;
  }
  get departureAnswer() {
    return this.reduceAnswer(this.qs.departureAnswer, this.departureQuestion);
  }
}

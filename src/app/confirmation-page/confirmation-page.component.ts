import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionService } from '../question.service';
import { SideComponentsServie } from '../side-components.service';
import { ButtonData } from '../models/button-data';
import { QuestionBase } from '../models/question-base';
import { GroupQuestion } from '../models/question-group';
import { isMoment, Moment } from 'moment';
import { FileQuestion } from '../models/question-file';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  @ViewChild('resultTable', { static: true }) resultTable: ElementRef;

  isAgree = false;

  buttons: ButtonData[] = [
    new ButtonData(
      'отправить',
      () => {
        const user = this.qs.senderAnswer.email || '';
        const answer = {
          sender: this.senderAnswer,
          address: this.addressAnswer,
          tools: this.toolsAnswer,
          departure: this.departureAnswer
        };
        const html = this.resultTableHtml;
        this.db.saveFormAnswer(answer, user, html);
      },
      () => {
        return !this.isAgree;
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

  constructor(
    private qs: QuestionService,
    private scs: SideComponentsServie,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.scs.setButtons(this.buttons);
    this.senderQuestions = this.qs.getSender();
    this.addressQuestion = this.qs.getAddress();
    this.toolsQuestion = this.qs.getTools();
    this.departureQuestion = this.qs.getDeparture();
  }

  get resultTableHtml() {
    return this.resultTable.nativeElement.outerHTML;
  }

  reduceAnswer(answer: any | any[] = {}, questions: any[] = []) {
    if (Array.isArray(answer)) {
      const answers = [];
      answer.forEach(curAnswer => {
        const ans = this.reduceAnswer(curAnswer, questions);
        answers.push(ans);
      });
      return answers;
    }
    const a = this.toArray(
      questions.reduce((p, c = {}, i) => {
        if (c instanceof GroupQuestion) {
          for (const item of this.reduceAnswer(answer, c.items)) {
            const ik = answer[item.key] || {};
            let value;
            if (item.isFile) {
              p[item.key] = item;
              continue;
            } else if (isMoment(ik)) {
              value = (ik as Moment).format('LL');
            } else if (item instanceof FileQuestion) {
            } else if (typeof value !== 'boolean' && !value) {
              value = typeof ik === 'object' ? ik.value : ik;
            }
            if (typeof value === 'boolean' && value) {
              value = 'да';
            }
            if (value) {
              p[item.key] = {
                value,
                label: item.specLable || item.label,
                order: item.order
              };
            }
          }
        } else if (c instanceof FileQuestion && answer[c.key]) {
          const value = answer[c.key].file;
          p[c.key] = { value, label: c.label, order: c.order, isFile: true };
        } else {
          const ak = answer[c.key] || {};
          let value;
          if (isMoment(ak)) {
            value = (ak as Moment).format('LL');
          } else if (Array.isArray(ak)) {
            value = ak.join(', ');
          } else if (typeof value !== 'boolean') {
            value = typeof ak === 'object' ? ak.value : ak;
          }
          if (typeof value === 'boolean' && value) {
            value = 'да';
          }
          if (value) {
            p[c.key] = { value, label: c.specLable || c.label, order: c.order };
          }
        }
        return p;
      }, {})
    );
    return a;
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
    return a;
  }

  get addressAnswer() {
    const a = this.reduceAnswer(this.qs.addressAnswer, this.addressQuestion);
    return a;
  }
  get toolsAnswer() {
    const a = this.reduceAnswer(this.qs.toolsAnswer, this.toolsQuestion);
    return a;
  }
  get departureAnswer() {
    const a = this.reduceAnswer(
      this.qs.departureAnswer,
      this.departureQuestion
    );
    return a;
  }
}

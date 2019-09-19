import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})
export class DepartureComponent implements OnInit {
  questions: QuestionBase<any>[];

  form: FormGroup;

  constructor(
    private questionService: QuestionService,
    private qcs: QuestionControlService
  ) {}

  chchStat;

  ngOnInit() {
    this.questions = this.questionService.getDeparture();
    this.form = this.qcs.toFormGroup(this.questions);
    console.log(this.questions);
    console.log(this.form);
    this.form
      .get('isAccum')
      .valueChanges.subscribe(value =>
        console.log(value, this.form.get('isAccum'))
      );
    this.form.addControl('chch', new FormControl(this.chchStat));
    console.log(this.form.get('chch'));
    this.form
      .get('chch')
      .valueChanges.subscribe(value =>
        console.log(value, this.form.get('chch'))
      );
  }

  onClick() {
    alert('подтвердить');
  }
}

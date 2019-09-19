import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[];
  questionSubscribtions: Subscription[] = [];

  formArray: FormGroup[] = [];
  currentFormIndex: number;

  constructor(
    private questionService: QuestionService,
    private qcs: QuestionControlService
  ) {}

  ngOnInit() {
    this.questions = this.questionService.getTools();

    this.questionService.toolsAnswer.forEach(answer => {
      this.addNewTool(answer);
    });
  }

  ngOnDestroy() {
    this.questionSubscribtions.forEach(q => q.unsubscribe());
  }

  addNewTool(answer = {}) {
    const newForm = this.qcs.toFormGroup(this.questions);
    newForm.patchValue(answer);
    this.formArray.push(newForm);
    this.currentFormIndex = this.formArray.length - 1;
    const curInd = this.currentFormIndex;
    this.questionSubscribtions.push(
      newForm.valueChanges.subscribe(
        values => (this.questionService.toolsAnswer[curInd] = { ...values })
      )
    );
  }

  deleteTool() {
    const ind = this.currentFormIndex;
    this.formArray.splice(ind, 1);
    this.questionSubscribtions[ind].unsubscribe();
    this.questionSubscribtions.splice(ind, 1);
    this.questionService.toolsAnswer.splice(ind, 1);
    this.currentFormIndex = this.formArray.length - 1;
  }

  get curForm(): FormGroup | null {
    return this.formArray[this.currentFormIndex] || null;
  }

  get formArrayData() {
    return this.formArray.map(f => (f ? f.value : ''));
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import {
  FormGroup,
  AbstractControl,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';

interface OrderToElem {
  el: AbstractControl;
  orderTo: string;
}
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[];
  questionsArray: QuestionBase<any>[][] = [];
  questionSubscribtions: Subscription[] = [];
  chargerTypeSubscriptions: Subscription[] = [];

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
    this.questionsArray.push(this.questionService.getTools());
    this.currentFormIndex = this.questionsArray.length - 1;
    const newForm = this.qcs.toFormGroup(this.curQuestions);

    newForm.patchValue(answer);
    this.formArray.push(newForm);
    const curInd = this.currentFormIndex;

    const radio = this.curQuestions.find(el => el.controlType === 'radio');

    if (this.curQuestions.find(el => !!el.orderTo) && radio) {
      const arr: OrderToElem[] = [];
      for (const elem of this.curQuestions) {
        if (elem.orderTo) {
          arr.push({
            el: this.curForm.get(elem.key),
            orderTo: elem.orderTo
          });
        }
      }
      this.chargerTypeSubscriptions[this.currentFormIndex] = this.curForm
        .get(radio.key)
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

    this.questionSubscribtions.push(
      newForm.valueChanges.subscribe(
        values => (this.questionService.toolsAnswer[curInd] = { ...values })
      )
    );
  }

  deleteTool() {
    const ind = this.currentFormIndex;
    if (ind === undefined || ind === null) {
      return;
    }
    this.formArray.splice(ind, 1);
    this.questionSubscribtions[ind].unsubscribe();
    this.questionSubscribtions.splice(ind, 1);
    this.questionService.toolsAnswer.splice(ind, 1);
    this.questionsArray.splice(ind, 1);
    this.currentFormIndex = this.formArray.length - 1;
  }

  onClickToTool(i: number) {
    this.currentFormIndex = i;
  }

  get curForm(): FormGroup | null {
    console.warn('curForm', this.currentFormIndex);
    return this.formArray[this.currentFormIndex] || null;
  }

  get curQuestions(): QuestionBase<any>[] {
    return this.questionsArray[this.currentFormIndex] || null;
  }

  get formArrayData() {
    return this.formArray.map(f => (f ? f.value : ''));
  }

  get isDisableDeleteButton() {
    const ind = this.currentFormIndex;
    return !(typeof ind === 'number' && ind >= 0);
  }

  addNewControlToArray() {
    const cf = this.formArray[this.currentFormIndex];
    for (const key in cf.controls) {
      if (cf.controls[key] instanceof FormArray) {
        (cf.controls[key] as FormArray).push(
          new FormControl('', Validators.required)
        );
        break;
      }
    }
  }
}

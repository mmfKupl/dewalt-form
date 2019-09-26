import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../models/question-base';
import {
  FormGroup,
  AbstractControl,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { Subscription } from 'rxjs';
import { ButtonData } from '../models/button-data';
import { SideComponentsServie } from '../side-components.service';

interface OrderToElem {
  el: AbstractControl;
  orderTo: string;
  key: string;
}
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[];
  questionSubscribtions: Subscription[] = [];
  chargerTypeSubscriptions: Subscription[] = [];

  formArray: FormGroup[] = [];
  currentFormIndex: number;
  curFilePath: string;
  curFileKey: string;
  spinnerHidden = true;

  buttons: ButtonData[] = [
    new ButtonData(
      'далее',
      () => {},
      () => {
        return !!this.formArray.reduce((p, c, i) => {
          return p - Number(c.valid);
        }, this.formArray.length);
      },
      '/departure',
      1,
      true
    ),
    new ButtonData('назад', () => {}, false, '/address', 2, true),
    new ButtonData(
      'добавить',
      () => {
        this.addNewTool();
      },
      false,
      '',
      3,
      true
    ),
    new ButtonData(
      'удалить',
      () => {
        this.deleteTool();
      },
      () => {
        return !this.formArray.length;
      },
      '',
      4,
      true
    ),
    new ButtonData(
      'очистить',
      () => {
        this.resetCurForm();
      },
      false,
      '',
      5,
      true
    )
  ];

  constructor(
    private questionService: QuestionService,
    private qcs: QuestionControlService,
    private cd: ChangeDetectorRef,
    private scs: SideComponentsServie
  ) {}

  ngOnInit() {
    this.scs.setShowTools(true);
    this.scs.setButtons(this.buttons);
    this.scs.setToolClickHandler((i: number) => {
      this.onClickToTool(i);
    });
    this.scs.setTools(this.formArray);

    this.questions = this.questionService.getTools();

    this.questionService.toolsAnswer.forEach(answer => {
      this.addNewTool(answer);
    });

    if (!this.formArray.length) {
      this.addNewTool({});
    }
  }

  ngOnDestroy() {
    this.scs.setShowTools(false);
    this.questionSubscribtions.forEach(q => q.unsubscribe());
    this.chargerTypeSubscriptions.forEach(q => q.unsubscribe());
  }

  resetCurForm() {
    this.curForm.reset();
    this.curFilePath = '';
  }

  addNewTool(answer = {}) {
    const newForm = this.qcs.toFormGroup(this.questions);
    newForm.patchValue(answer);
    for (const key in answer) {
      if (answer[key] && Array.isArray(answer[key])) {
        const arr = newForm.get(key) as FormArray;
        arr.setValidators(Validators.required);
        answer[key].forEach(elem => {
          arr.push(new FormControl(elem, Validators.required));
        });
      }
    }
    this.curFilePath =
      (answer['warranty-img'] && answer['warranty-img'].fileName) || '';

    this.formArray.push(newForm);
    this.currentFormIndex = this.formArray.length - 1;
    const curInd = this.currentFormIndex;

    const radio = this.questions.find(el => el.controlType === 'radio');

    if (this.questions.find(el => !!el.orderTo) && radio) {
      const arr: OrderToElem[] = [];
      for (const elem of this.questions) {
        if (elem.orderTo) {
          const formEl = this.curForm.get(elem.key);
          const el = {
            el: formEl,
            orderTo: elem.orderTo,
            key: elem.key
          };

          arr.push(el);
        }
      }

      const setValidators = (value, doReset: boolean = true) => {
        arr.forEach(el => {
          if (el.orderTo === value) {
            el.el.setValidators(Validators.required);
            if (el.el instanceof FormArray) {
              el.el.controls.forEach(
                control =>
                  control.setValidators &&
                  control.setValidators(Validators.required)
              );
            }
          } else {
            el.el.clearValidators();
            if (el.el instanceof FormArray) {
              el.el.controls.forEach(control => control.clearValidators());
            }
          }
          if (doReset) {
            el.el.reset();
          }
          el.el.markAsTouched();
        });
      };

      arr.forEach(elem => {
        const curControl = this.curForm.get(elem.key);
        if (
          curControl &&
          ((Array.isArray(curControl.value) && curControl.value.length) ||
            (!Array.isArray(curControl.value) && curControl.value)) &&
          !curControl.validator
        ) {
          setValidators(elem.orderTo, false);
        }
      });

      this.chargerTypeSubscriptions[this.currentFormIndex] = this.curForm
        .get(radio.key)
        .valueChanges.subscribe(value => {
          setValidators(value);
        });
    }

    this.questionSubscribtions.push(
      newForm.valueChanges.subscribe(values => {
        this.questionService.toolsAnswer[curInd] = { ...values };
      })
    );
    this.scs.setTools(this.formArray);
    this.scs.setCurrentToolIndex(this.currentFormIndex);
  }

  deleteTool() {
    const ind = this.currentFormIndex;
    if (ind === undefined || ind === null || ind < 0) {
      return;
    }
    this.formArray.splice(ind, 1);
    if (this.questionSubscribtions[ind]) {
      this.questionSubscribtions[ind].unsubscribe();
    }
    this.questionSubscribtions.splice(ind, 1);
    this.questionService.toolsAnswer.splice(ind, 1);
    this.currentFormIndex = this.formArray.length - 1;
    this.scs.setTools(this.formArray);
    this.scs.setCurrentToolIndex(this.currentFormIndex);
  }

  onClickToTool(i: number) {
    this.currentFormIndex = i;
    this.scs.setCurrentToolIndex(this.currentFormIndex);
    this.curFilePath =
      (this.curForm.get(this.curFileKey) &&
        this.curForm.get(this.curFileKey).value &&
        this.curForm.get(this.curFileKey).value.fileName) ||
      '';
  }

  onFileDelete(key: string) {
    const curElem = this.curForm.get(key);
    if (curElem) {
      curElem.reset();
      this.curFilePath = '';
    }
  }

  onFileChange(elem: HTMLInputElement) {
    this.spinnerHidden = false;
    if (!this.curFileKey) {
      this.curFileKey = elem.id;
    }

    if (elem.files && elem.files.length) {
      const file = elem.files[0];
      this.curFilePath = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = res => {
        this.spinnerHidden = true;
        this.curForm
          .get(elem.id)
          .patchValue({ fileName: file.name, file: reader.result });
        this.cd.markForCheck();
      };
    }
  }

  get curForm(): FormGroup | null {
    return this.formArray[this.currentFormIndex] || null;
  }

  get isDisableDeleteButton() {
    const ind = this.currentFormIndex;
    return !(typeof ind === 'number' && ind >= 0);
  }

  get isAllValid() {
    if (!this.formArray.length) {
      return false;
    }
    for (const form of this.formArray) {
      if (form.invalid) {
        return false;
      }
    }
    return true;
  }

  addNewControlToArray(pos: string) {
    const posN = Number(pos);
    const cf = this.formArray[this.currentFormIndex];
    for (const key in cf.controls) {
      if (cf.controls[key] instanceof FormArray) {
        if (posN >= 0) {
          (cf.controls[key] as FormArray).controls.splice(posN, 1);
        } else if (posN === -1) {
          (cf.controls[key] as FormArray).push(
            new FormControl('', Validators.required)
          );
        }
        break;
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { Options } from './models/options';

@Injectable({ providedIn: 'root' })
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: Options<any>[]) {
    const group: any = {};

    const add = question => {
      if (question.controlType === 'group') {
        question.items.forEach(item => {
          add(item);
        });
        return;
      }
      const cond = question.value === undefined || question.value === null;
      const validators = [];

      if (question.required) {
        validators.push(Validators.required);
      }

      if (question.type === 'email') {
        validators.push(Validators.email);
      }

      if (question.controlType === 'textbox-array') {
        group[question.key] = new FormArray([...question.inputs], validators);
      } else {
        group[question.key] = new FormControl(
          cond ? '' : question.value,
          validators
        );
      }
    };

    questions.forEach(question => {
      if (question.controlType === 'group') {
        question.items.forEach(item => {
          add(item);
        });
        return;
      }
      add(question);
    });
    return new FormGroup(group);
  }
}

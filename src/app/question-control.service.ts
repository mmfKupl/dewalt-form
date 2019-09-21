import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Options } from './options';

@Injectable({ providedIn: 'root' })
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: Options<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      const cond = question.value === undefined || question.value === null;
      const validators = [];

      if (question.required) {
        validators.push(Validators.required);
      }

      if (question.type === 'email') {
        validators.push(Validators.email);
      }

      group[question.key] = new FormControl(
        cond ? '' : question.value,
        validators
      );
    });
    return new FormGroup(group);
  }
}

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
      group[question.key] = question.required
        ? new FormControl(cond ? '' : question.value, Validators.required)
        : new FormControl(cond ? '' : question.value);
    });
    return new FormGroup(group);
  }
}

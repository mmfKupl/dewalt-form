import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Options } from '../options';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class DynamicFormQuestionComponent {
  @Input() question: Options<any>;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}

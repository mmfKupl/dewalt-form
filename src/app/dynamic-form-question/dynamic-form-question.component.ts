import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Options } from '../models/options';

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
  @Input() fileName: string;
  @Input() spinnerHidden: boolean;

  @Output() formArrayButtonClick = new EventEmitter<string>();
  @Output() fileChange = new EventEmitter<HTMLInputElement>();

  onFormArrayButtonClick(action: string, i: number = -1) {
    this.formArrayButtonClick.emit(i.toString());
  }

  onFileChange(elem: HTMLInputElement) {
    this.fileChange.emit(elem);
  }

  getDiametr(elem: HTMLDivElement) {
    return Math.floor(elem.clientHeight * 0.8);
  }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  getFormArray(key: string): FormArray {
    return this.form.get(key) as FormArray;
  }

  addNewFormControl() {
    return this.getFormArray(this.question.key).push(
      new FormControl('', Validators.required)
    );
  }
}

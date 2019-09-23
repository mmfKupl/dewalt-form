import { QuestionBase } from './question-base';
import { Options } from './options';
import { FormControl, Validators } from '@angular/forms';

export class TextboxArrayQuestion extends QuestionBase<any[]> {
  controlType = 'textbox-array';

  constructor(options: Options<any[]> = {}) {
    super(options);
    this.inputs = options.inputs || [new FormControl('', Validators.required)];
    console.log(this.inputs);
  }
}

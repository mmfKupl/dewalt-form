import { QuestionBase } from './question-base';
import { Options } from './options';

export class CheckboxQuestion extends QuestionBase<boolean> {
  controlType = 'checkbox';
  type: string;

  constructor(options: Options<boolean> = {}) {
    super(options);
    this.type = options.type || '';
  }
}

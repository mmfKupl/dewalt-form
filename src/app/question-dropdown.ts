import { QuestionBase } from './question-base';
import { Options } from './options';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: { key: string; value: string }[] = [];

  constructor(options: Options<string> = {}) {
    super(options);
    this.options = options.options || [];
  }
}

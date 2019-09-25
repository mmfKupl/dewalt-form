import { QuestionBase } from './question-base';
import { Options } from './options';

export class DateQuestion extends QuestionBase<string> {
  controlType = 'date';
  type = 'date';

  constructor(options: Options<string> = {}) {
    super(options);
  }
}

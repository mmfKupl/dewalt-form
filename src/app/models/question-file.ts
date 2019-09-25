import { QuestionBase } from './question-base';
import { Options } from './options';

export class FileQuestion extends QuestionBase<object> {
  controlType = 'file';
  type = 'file';

  constructor(options: Options<object> = {}) {
    super(options);
  }
}

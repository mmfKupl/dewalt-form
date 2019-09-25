import { QuestionBase } from './question-base';
import { Options } from './options';

export class GroupQuestion extends QuestionBase<string> {
  controlType = 'group';

  constructor(options: Options<string> = {}) {
    super(options);
  }
}

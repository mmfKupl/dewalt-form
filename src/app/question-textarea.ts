import { QuestionBase } from './question-base';
import { Options } from './options';

export class TextareaQuestion extends QuestionBase<string> {
  controlType = 'textarea';

  constructor(options: Options<string> = {}) {
    super(options);
  }
}

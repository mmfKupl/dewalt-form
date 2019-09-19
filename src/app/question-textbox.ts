import { QuestionBase } from './question-base';
import { Options } from './options';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: Options<string> = {}) {
    super(options);
    this.type = options.type || '';
  }
}

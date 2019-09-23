import { QuestionBase } from './question-base';
import { Options } from './options';

export class RadioQuestion extends QuestionBase<boolean> {
  controlType = 'radio';
  type: string;

  constructor(options: Options<boolean> = {}) {
    super(options);
    this.type = options.type || 'radio';
  }
}

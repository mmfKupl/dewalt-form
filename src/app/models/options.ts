import { QuestionBase } from './question-base';

export class Options<T> {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: string;
  options?: any[];
  type?: any;
  orderTo?: string;
  hiddenIfNotRequired?: boolean;
  name?: string;
  fixedLength?: number;
  values?: any[];
  inputs?: any[];
  items?: QuestionBase<any>[];
  step?: number;
  min?: number;
  plaseholder?: string;
  max?: number;
  specLable?: string;
}

import { Options } from './options';

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  orderTo?: string;
  hiddenIfNotRequired?: boolean;
  name?: string;
  fixedLength?: number;
  values?: any[];
  inputs?: any[];
  items?: QuestionBase<any>[];
  step?: number;
  min?: number;
  placeholder?: string;
  max?: number;
  specLable?: string;

  constructor(options: Options<T> = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.orderTo = options.orderTo;
    this.hiddenIfNotRequired = options.hiddenIfNotRequired;
    this.name = options.name;
    this.fixedLength = options.fixedLength;
    this.values = options.values;
    this.inputs = options.inputs;
    this.items = options.items;
    this.step = options.step;
    this.min = options.min;
    this.placeholder = options.placeholder;
    this.max = options.max;
    this.specLable = options.specLable;
  }
}

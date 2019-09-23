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
}

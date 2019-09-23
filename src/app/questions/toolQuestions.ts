import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { TextareaQuestion } from '../question-textarea';
import { DateQuestion } from '../question-date';
import { DropdownQuestion } from '../question-dropdown';
import { CheckboxQuestion } from '../question-checkbox';
import { RadioQuestion } from '../question-radio';
import { TextboxArrayQuestion } from '../question-textbox-array';

const toolQuestions: QuestionBase<any>[] = [
  new DropdownQuestion({
    label: 'Бренд',
    required: true,
    options: [
      { key: 'dewalt', value: 'DeWALT' },
      { key: 'stanley', value: 'Stanley' },
      { key: 'bandd', value: 'Black & Decker' }
    ],
    order: 0,
    key: 'brend-type'
  }),

  new TextboxQuestion({
    label: 'Артикул',
    type: 'text',
    required: true,
    order: 1,
    key: 'tool-vendor-code'
  }),

  // new TextboxQuestion({
  //   label: 'Тип инструмента',
  //   type: 'text',
  //   required: true,
  //   order: 2,
  //   key: 'tool-type'
  // }),

  // new TextboxQuestion({
  //   label: 'Серийный номер',
  //   type: 'number',
  //   required: true,
  //   order: 3,
  //   key: 'tool-serial-number'
  // }),

  // new DateQuestion({
  //   label: 'Дата продажи',
  //   required: true,
  //   order: 4,
  //   key: 'tool-sale-date'
  // }),

  // new TextareaQuestion({
  //   label: 'Описание неисправности',
  //   required: true,
  //   order: 5,
  //   key: 'tool-description'
  // }),

  // new RadioQuestion({
  //   label: 'Тип питания',
  //   order: 6,
  //   required: true,
  //   values: [
  //     { label: 'Аккумуляторный', key: 'acum-type', value: 'acum' },
  //     { label: 'Сетевой', key: 'new-type', value: 'net' }
  //   ],
  //   key: 'power-type'
  // }),

  // new TextboxQuestion({
  //   label: 'Номер зарядного устройства',
  //   order: 7,
  //   orderTo: 'acum-type',
  //   hiddenIfNotRequired: true,
  //   key: 'number-of-charger',
  //   type: 'text'
  // }),

  new TextboxArrayQuestion({
    label: 'Номера аккумуляторов',
    order: 8,
    orderTo: 'acum-type',
    // hiddenIfNotRequired: true,
    key: 'accums-numbers',
    type: 'text'
  })
];

export default toolQuestions;

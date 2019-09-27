import { QuestionBase } from '../models/question-base';
import { TextboxQuestion } from '../models/question-textbox';
import { TextareaQuestion } from '../models/question-textarea';
import { DateQuestion } from '../models/question-date';
import { DropdownQuestion } from '../models/question-dropdown';
import { CheckboxQuestion } from '../models/question-checkbox';
import { RadioQuestion } from '../models/question-radio';
import { TextboxArrayQuestion } from '../models/question-textbox-array';
import { FileQuestion } from '../models/question-file';
import { GroupQuestion } from '../models/question-group';

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

  new GroupQuestion({
    order: 0.3,
    items: [
      new FileQuestion({
        label: 'Гарантийный талон (фото)',
        required: true,
        order: 0.2,
        key: 'warranty-img'
      }),
      new DateQuestion({
        label: 'Дата продажи',
        required: true,
        order: 4,
        key: 'tool-sale-date'
      })
    ]
  }),

  new GroupQuestion({
    order: 0.5,
    items: [
      new TextboxQuestion({
        label: 'Артикул (торговое название инструмента)',
        type: 'text',
        required: true,
        order: 1,
        key: 'tool-vendor-code'
      }),

      new TextboxQuestion({
        label: 'Тип инструмента (код изделия)',
        type: 'text',
        required: true,
        order: 2,
        key: 'tool-type'
      }),

      new TextboxQuestion({
        label: 'Заводской номер (серийный номер)',
        type: 'text',
        required: true,
        order: 3,
        key: 'tool-serial-number'
      })
    ]
  }),

  new TextboxQuestion({
    label: 'Продавец (название организации)',
    type: 'text',
    required: true,
    order: 4.5,
    key: 'tool-seller-name'
  }),

  new TextareaQuestion({
    label: 'Описание неисправности',
    required: true,
    order: 5,
    key: 'tool-description'
  }),

  new RadioQuestion({
    label: 'Тип питания',
    order: 6,
    required: true,
    values: [
      { label: 'Аккумуляторный', key: 'Аккумуляторный', value: 'acum' },
      { label: 'Сетевой', key: 'Сетевой', value: 'net' }
    ],
    key: 'power-type'
  }),

  new TextboxQuestion({
    label: 'Номер зарядного устройства',
    order: 7,
    orderTo: 'Аккумуляторный',
    hiddenIfNotRequired: true,
    key: 'charger-number',
    type: 'text'
  }),

  new TextboxArrayQuestion({
    label: 'Номера аккумуляторов',
    order: 8,
    orderTo: 'Аккумуляторный',
    hiddenIfNotRequired: true,
    key: 'accums-numbers',
    type: 'text'
  })
];

export default toolQuestions;

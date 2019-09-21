import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { TextareaQuestion } from '../question-textarea';
import { CheckboxQuestion } from '../question-checkbox';

const departureQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    label: 'Вес, кг',
    type: 'number',
    required: true,
    order: 1,
    key: 'd-weight'
  }),

  new TextboxQuestion({
    label: 'Ширина, см',
    type: 'number',
    required: true,
    order: 2,
    key: 'd-width'
  }),

  new TextboxQuestion({
    label: 'Высота, см',
    type: 'number',
    required: true,
    order: 3,
    key: 'd-height'
  }),

  new TextboxQuestion({
    label: 'Длинна, см',
    type: 'number',
    required: true,
    order: 4,
    key: 'd-length'
  }),

  new CheckboxQuestion({
    label: 'Есть аккумулятор',
    type: 'checkbox',
    order: 5,
    value: false,
    key: 'd-is-accum'
  }),

  new CheckboxQuestion({
    label: 'Есть зарядное устройство',
    type: 'checkbox',
    order: 6,
    value: false,
    key: 'd-is-charger'
  })
];

export default departureQuestions;

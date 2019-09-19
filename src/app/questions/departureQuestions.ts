import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { TextareaQuestion } from '../question-textarea';
import { CheckboxQuestion } from '../question-checkbox';

const departureQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    key: 'weight',
    label: 'Вес, кг',
    type: 'number',
    required: true,
    order: 1
  }),

  new TextboxQuestion({
    key: 'width',
    label: 'Ширина, см',
    type: 'number',
    required: true,
    order: 2
  }),

  new TextboxQuestion({
    key: 'height',
    label: 'Высота, см',
    type: 'number',
    required: true,
    order: 3
  }),

  new TextboxQuestion({
    key: 'length',
    label: 'Длинна, см',
    type: 'number',
    required: true,
    order: 4
  }),

  new CheckboxQuestion({
    key: 'isAccum',
    label: 'Есть аккумулятор',
    type: 'checkbox',
    order: 5,
    value: false
  }),

  new CheckboxQuestion({
    key: 'isCharger',
    label: 'Есть зарядное устройство',
    type: 'checkbox',
    order: 6,
    value: false
  })
];

export default departureQuestions;

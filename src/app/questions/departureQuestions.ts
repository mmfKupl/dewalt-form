import { QuestionBase } from '../models/question-base';
import { TextboxQuestion } from '../models/question-textbox';
import { TextareaQuestion } from '../models/question-textarea';
import { CheckboxQuestion } from '../models/question-checkbox';
import { GroupQuestion } from '../models/question-group';

const departureQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    label: 'Количество грузовых мест',
    type: 'number',
    required: true,
    order: 0,
    key: 'amount-of-boxes'
  }),

  // new GroupQuestion({
  //   order: 1,
  //   items: [
  new TextboxQuestion({
    label: 'Общий вес, кг',
    type: 'number',
    required: true,
    order: 1,
    key: 'd-weight-total',
    step: 0.01,
    min: 0,
    plaseholder: '0.00'
  }),

  // new TextboxQuestion({
  //   label: 'Вес самого тяжелого груза, кг',
  //   type: 'number',
  //   required: true,
  //   order: 1,
  //   key: 'd-weight'
  // })
  //   ]
  // }),

  new GroupQuestion({
    order: 2,
    items: [
      new TextboxQuestion({
        label: 'Ширина, см',
        type: 'number',
        required: true,
        order: 2,
        min: 0,
        key: 'd-width'
      }),

      new TextboxQuestion({
        label: 'Высота, см',
        type: 'number',
        required: true,
        order: 3,
        min: 0,
        key: 'd-height'
      }),

      new TextboxQuestion({
        label: 'Длинна, см',
        type: 'number',
        required: true,
        order: 4,
        min: 0,
        key: 'd-length'
      })
    ]
  }),

  new CheckboxQuestion({
    order: 5,
    label: 'Доверенность на получение',
    key: 'power-of-attorney'
  }),

  new CheckboxQuestion({
    order: 6,
    label: 'Пропуск на въезд',
    key: 'pass'
  })
];

export default departureQuestions;

import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';

const donloadingAddressQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    key: 'settlement',
    label: 'Населенный пункт РБ',
    type: 'text',
    required: true,
    order: 1
  }),

  new TextboxQuestion({
    key: 'street',
    label: 'Улица',
    type: 'text',
    required: true,
    order: 2
  }),

  new TextboxQuestion({
    key: 'house',
    label: 'Дом',
    type: 'text',
    required: true,
    order: 3
  }),

  new TextboxQuestion({
    key: 'building',
    label: 'Корпус',
    type: 'text',
    required: true,
    order: 4
  }),

  new TextboxQuestion({
    key: 'apartment',
    label: 'Квартира',
    type: 'text',
    required: true,
    order: 5
  }),

  new TextboxQuestion({
    key: 'downloadingDate',
    label: 'Дата загрузки',
    type: 'date',
    required: true,
    order: 6
  }),

  new TextboxQuestion({
    key: 'dtFrom',
    label: 'Время забора груза: с',
    type: 'time',
    required: true,
    order: 7
  }),

  new TextboxQuestion({
    key: 'dtDinnerFrom',
    label: 'Время забора груза: обед: c',
    type: 'time',
    required: true,
    order: 8
  }),

  new TextboxQuestion({
    key: 'dtDinnerTo',
    label: 'Время забора груза: обед: до',
    type: 'time',
    required: true,
    order: 9
  }),

  new TextboxQuestion({
    key: 'dtTo',
    label: 'Время забора груза: до',
    type: 'time',
    required: true,
    order: 10
  })
];

export default donloadingAddressQuestions;

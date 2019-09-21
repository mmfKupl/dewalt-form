import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { DateQuestion } from '../question-date';

const donloadingAddressQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    label: 'Населенный пункт РБ',
    type: 'text',
    required: true,
    order: 1,
    key: 'city'
  }),

  new TextboxQuestion({
    label: 'Улица',
    type: 'text',
    required: true,
    order: 2,
    key: 'street'
  }),

  new TextboxQuestion({
    label: 'Дом',
    type: 'text',
    required: true,
    order: 3,
    key: 'house'
  }),

  new TextboxQuestion({
    label: 'Корпус',
    type: 'text',
    required: true,
    order: 4,
    key: 'house-building'
  }),

  new TextboxQuestion({
    label: 'Квартира',
    type: 'text',
    required: true,
    order: 5,
    key: 'house-room'
  }),

  new DateQuestion({
    label: 'Дата загрузки',
    required: true,
    order: 6,
    key: 'downloading-date'
  }),

  new TextboxQuestion({
    label: 'Время забора груза с',
    type: 'time',
    required: true,
    order: 7,
    key: 'da-downloading-time-from'
  }),

  new TextboxQuestion({
    label: 'Обед c',
    type: 'time',
    required: true,
    order: 9,
    key: 'da-dinner-time-from'
  }),

  new TextboxQuestion({
    label: 'Обед до',
    type: 'time',
    required: true,
    order: 10,
    key: 'da-dinner-time-to'
  }),

  new TextboxQuestion({
    label: 'Время забора груза до',
    type: 'time',
    required: true,
    order: 8,
    key: 'da-downloading-time-to'
  })
];

export default donloadingAddressQuestions;

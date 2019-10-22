import { QuestionBase } from '../models/question-base';
import { DropdownQuestion } from '../models/question-dropdown';
import { TextboxQuestion } from '../models/question-textbox';

const senderQuestions: QuestionBase<any>[] = [
  new DropdownQuestion({
    label: 'Тип отправителя',
    required: true,
    options: [
      { key: 'individual', value: 'Физ. лицо' },
      { key: 'entity', value: 'Юр. лицо' }
    ],
    order: 1,
    key: 'type-sender'
  }),

  new TextboxQuestion({
    label: 'ФИО',
    type: 'text',
    orderTo: 'Физ. лицо',
    hiddenIfNotRequired: true,
    order: 2,
    key: 'name-fio',
    name: 'name'
  }),

  new TextboxQuestion({
    label: 'Наименование компании',
    type: 'text',
    orderTo: 'Юр. лицо',
    hiddenIfNotRequired: true,
    order: 3,
    key: 'company-name'
  }),

  new TextboxQuestion({
    label: 'УНП',
    type: 'text',
    orderTo: 'Юр. лицо',
    hiddenIfNotRequired: true,
    order: 4,
    key: 'sender-upn',
    fixedLength: 9
  }),

  new TextboxQuestion({
    label: 'Контактное лицо',
    type: 'text',
    required: true,
    order: 5,
    key: 'name-contact'
  }),

  new TextboxQuestion({
    label: 'Контактный номер телефона',
    type: 'tel',
    required: true,
    order: 6,
    key: 'tel-sender'
  }),

  new TextboxQuestion({
    label: 'Email',
    type: 'email',
    order: 7,
    key: 'email'
  }),

  new TextboxQuestion({
    label: 'Viber',
    type: 'viber-let',
    order: 8,
    key: 'viber-tel'
  })
];

export default senderQuestions;

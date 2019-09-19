import { QuestionBase } from '../question-base';
import { DropdownQuestion } from '../question-dropdown';
import { TextboxQuestion } from '../question-textbox';

const senderQuestions: QuestionBase<any>[] = [
  new DropdownQuestion({
    key: 'type',
    label: 'Тип отправителя',
    required: true,
    options: [
      { key: 'individual', value: 'Физ. лицо' },
      { key: 'entity', value: 'Юр. лицо' }
    ],
    order: 1
  }),

  new TextboxQuestion({
    key: 'FIO',
    label: 'ФИО',
    type: 'text',
    orderTo: 'individual',
    hiddenIfNotRequired: true,
    order: 2
  }),

  new TextboxQuestion({
    key: 'companyName',
    label: 'Наименование компании',
    type: 'text',
    orderTo: 'entity',
    hiddenIfNotRequired: true,
    order: 3
  }),

  new TextboxQuestion({
    key: 'UPN',
    label: 'УНП',
    type: 'text',
    orderTo: 'entity',
    hiddenIfNotRequired: true,
    order: 4
  }),

  new TextboxQuestion({
    key: 'contactFace',
    label: 'Контактное лицо',
    type: 'text',
    required: true,
    order: 5
  }),

  new TextboxQuestion({
    key: 'contactNumber',
    label: 'Контактный номер',
    type: 'text',
    required: true,
    order: 6
  }),

  new TextboxQuestion({
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    order: 7
  })
];

export default senderQuestions;

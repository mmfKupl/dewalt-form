import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { TextareaQuestion } from '../question-textarea';
import { DateQuestion } from '../question-date';

const toolQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    label: 'Артикул',
    type: 'text',
    required: true,
    order: 1,
    key: 'tool-vendor-code'
  }),

  new TextboxQuestion({
    label: 'Тип инструмента',
    type: 'text',
    required: true,
    order: 2,
    key: 'tool-type'
  }),

  new TextboxQuestion({
    label: 'Серийный номер',
    type: 'number',
    required: true,
    order: 3,
    key: 'tool-serial-number'
  }),

  new DateQuestion({
    label: 'Дата продажи',
    required: true,
    order: 4,
    key: 'tool-sale-date'
  }),

  new TextareaQuestion({
    label: 'Описание неисправности',
    required: true,
    order: 5,
    key: 'tool-description'
  })
];

export default toolQuestions;

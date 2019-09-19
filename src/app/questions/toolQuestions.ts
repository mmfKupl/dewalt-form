import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { TextareaQuestion } from '../question-textarea';

const toolQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    key: 'article',
    label: 'Артикул',
    type: 'text',
    required: true,
    order: 1
  }),

  new TextboxQuestion({
    key: 'toolType',
    label: 'Тип инструмента',
    type: 'text',
    required: true,
    order: 2
  }),

  new TextboxQuestion({
    key: 'serialNumber',
    label: 'Серийный номер',
    type: 'number',
    required: true,
    order: 3
  }),

  new TextboxQuestion({
    key: 'saleDate',
    label: 'Дата продажи',
    type: 'date',
    required: true,
    order: 4
  }),

  new TextareaQuestion({
    key: 'description',
    label: 'Описание неисправности',
    required: true,
    order: 5
  })
];

export default toolQuestions;

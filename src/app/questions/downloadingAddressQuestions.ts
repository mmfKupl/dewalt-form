import { QuestionBase } from '../models/question-base';
import { TextboxQuestion } from '../models/question-textbox';
import { DateQuestion } from '../models/question-date';
import { GroupQuestion } from '../models/question-group';
import { DropdownQuestion } from '../models/question-dropdown';

const streetTypes = [
  { key: '', value: '' },
  { key: 'б-р', value: 'Бульвар' },
  { key: 'вал', value: 'Вал' },
  { key: 'вг', value: 'Военный городок' },
  { key: 'вч', value: 'Воинская часть' },
  { key: 'въезд', value: 'Въезд' },
  { key: 'кв-л', value: 'Квартал' },
  { key: 'к/о', value: 'Кольцо' },
  { key: 'маг.', value: 'Магистраль' },
  { key: 'мкр-н', value: 'Микрорайон' },
  { key: 'наб.', value: 'Набережная' },
  { key: 'парк', value: 'Парк' },
  { key: 'пер.', value: 'Переулок' },
  { key: 'пл.', value: 'Площадь' },
  { key: 'пос.', value: 'Поселок' },
  { key: 'пр-д', value: 'Проезд' },
  { key: 'пр.', value: 'Проспект' },
  { key: 'разъед', value: 'Разъезд' },
  { key: 'сп.', value: 'Спуск' },
  { key: 'ст.', value: 'Станция' },
  { key: 'тер.', value: 'Территория' },
  { key: 'тр.', value: 'Тракт' },
  { key: 'туп.', value: 'Тупик' },
  { key: 'ул.', value: 'Улица' },
  { key: 'уроч.', value: 'Урочище' },
  { key: 'шоссе', value: 'Шоссе' }
];

const donloadingAddressQuestions: QuestionBase<any>[] = [
  new TextboxQuestion({
    label: 'Населенный пункт РБ (Вид, название, район, область)',
    type: 'text',
    required: true,
    placeholder: 'Минская область, Дзержинский район, г. Фаниполь',
    order: 1,
    key: 'city'
  }),

  new GroupQuestion({
    order: 2,
    label: 'Улица',
    items: [
      new DropdownQuestion({
        label: 'тип',
        specLable: 'Тип улицы',
        options: streetTypes,
        order: 1,
        key: 'street-type'
      }),
      new TextboxQuestion({
        label: 'название',
        specLable: 'Название улицы',
        type: 'text',
        required: true,
        order: 2,
        key: 'street'
      })
    ]
  }),

  new GroupQuestion({
    order: 2.3,
    items: [
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
        order: 4,
        key: 'house-building'
      }),

      new TextboxQuestion({
        label: 'Квартира/Помещение/Офис',
        type: 'text',
        order: 5,
        key: 'house-room'
      })
    ]
  }),

  new DateQuestion({
    label: 'Дата загрузки',
    required: true,
    order: 6,
    key: 'downloading-date'
  }),

  new GroupQuestion({
    order: 7,
    items: [
      new GroupQuestion({
        order: 1,
        label: 'Время забора груза',
        items: [
          new TextboxQuestion({
            label: 'с',
            specLable: 'Время забора груза: С',
            type: 'time',
            required: true,
            order: 7,
            key: 'da-downloading-time-from',
            value: '09:00'
          }),

          new TextboxQuestion({
            label: 'до',
            specLable: 'Время забора груза: ДО',
            type: 'time',
            required: true,
            order: 8,
            key: 'da-downloading-time-to',
            value: '18:00'
          })
        ]
      }),
      new GroupQuestion({
        order: 2,
        label: 'Время обеда',
        items: [
          new TextboxQuestion({
            label: 'c',
            specLable: 'Время обеда: С',
            type: 'time',
            order: 9,
            key: 'da-dinner-time-from',
            value: '13:00'
          }),

          new TextboxQuestion({
            label: 'до',
            specLable: 'Время обеда: ДО',
            type: 'time',
            order: 10,
            key: 'da-dinner-time-to',
            value: '14:00'
          })
        ]
      })
    ]
  })
];

export default donloadingAddressQuestions;

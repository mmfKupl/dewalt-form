import { Injectable } from '@angular/core';

import senderQuestions from './questions/senderQuestions';
import departureQuestions from './questions/departureQuestions';
import toolQuestions from './questions/toolQuestions';
import downloadingAddressQuestions from './questions/downloadingAddressQuestions';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  senderAnswer = {};
  addressAnswer = {};
  toolsAnswer = [];
  departureAnswer = {};

  links = [
    { path: '/sender', title: 'Отправитель', order: 1 },
    { path: '/address', title: 'Адрес загрузки', order: 2 },
    { path: '/tools', title: 'Инструменты', order: 3 },
    { path: '/departure', title: 'Отправление', order: 4 },
    { path: '/confirmation', title: 'Подтверждение', order: 5 }
  ];

  getSender() {
    return senderQuestions.sort((a, b) => a.order - b.order);
  }
  getAddress() {
    return downloadingAddressQuestions.sort((a, b) => a.order - b.order);
  }
  getTools() {
    return [...toolQuestions.sort((a, b) => a.order - b.order)];
  }
  getDeparture() {
    return departureQuestions.sort((a, b) => a.order - b.order);
  }

  getHeaders() {
    return this.links.sort((a, b) => a.order - b.order);
  }
}

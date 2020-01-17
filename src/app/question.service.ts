import { Injectable } from '@angular/core';

import senderQuestions from './questions/senderQuestions';
import departureQuestions from './questions/departureQuestions';
import toolQuestions from './questions/toolQuestions';
import downloadingAddressQuestions from './questions/downloadingAddressQuestions';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  senderAnswer: any = {
    'company-name': null,
    email: 'ikuplevich97@gmail.com',
    'name-contact': 'qweqwe',
    'name-fio': 'qweqwe',
    'sender-unp': null,
    'tel-sender': '123123',
    'type-sender': 'Физ. лицо',
    'viber-tel': '13'
  };
  addressAnswer: any = {
    city: 'Минск',
    'da-dinner-time-from': '12:21',
    'da-dinner-time-to': '12:12',
    'da-downloading-time-from': '12:12',
    'da-downloading-time-to': '12:01',
    house: '50',
    'house-building': '2',
    'house-room': '122',
    street: 'Тикоцкого',
    'street-type': 'Бульвар'
  };
  toolsAnswer: any[] = [
    {
      'accums-numbers': [],
      'brend-type': 'Black & Decker',
      'charger-number': null,
      'power-type': 'Сетевой',
      'tool-description': '123sssdsdsdsd',
      'tool-seller-name': '123',
      'tool-serial-number': '123',
      'tool-type': '123',
      'tool-vendor-code': '123'
    },
    {
      'accums-numbers': ['123123', 'zxczxc', '12312'],
      'brend-type': 'DeWALT',
      'charger-number': '123123',
      'power-type': 'Аккумуляторный',
      'tool-description': '123123123123132',
      'tool-seller-name': '123123',
      'tool-serial-number': '123123',
      'tool-type': '123123',
      'tool-vendor-code': '123123'
    }
  ];
  departureAnswer: any = {
    'amount-of-boxes': '2',
    'd-height': '12',
    'd-length': '12',
    'd-weight-total': '12',
    'd-width': '12',
    pass: true,
    'power-of-attorney': true
  };

  links = [
    { path: '/', title: 'Главная', order: 0 },
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

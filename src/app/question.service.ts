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

  getQuestions() {
    return {
      senderGroup: senderQuestions.sort((a, b) => a.order - b.order),
      downloadingAddressGroup: downloadingAddressQuestions.sort(
        (a, b) => a.order - b.order
      ),
      toolGroup: toolQuestions.sort((a, b) => a.order - b.order),
      departureGroup: departureQuestions.sort((a, b) => a.order - b.order)
    };
  }

  getSender() {
    return senderQuestions.sort((a, b) => a.order - b.order);
  }
  getAddress() {
    return downloadingAddressQuestions.sort((a, b) => a.order - b.order);
  }
  getTools() {
    return toolQuestions.sort((a, b) => a.order - b.order);
  }
  getDeparture() {
    return departureQuestions.sort((a, b) => a.order - b.order);
  }
}

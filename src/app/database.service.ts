import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireFunctions } from '@angular/fire/functions';
import { retryWhen } from 'rxjs/operators';

class Item {
  value: string | number | File;
  label: string;
  order: number;
  key: string;
}

class Answer {
  sender: Item[];
  address: Item[];
  tools: any;
  departure: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private db: AngularFirestore,
    private st: AngularFireStorage,
    private functions: AngularFireFunctions
  ) {}

  get formAnswerCollection() {
    return this.db.collection('formAnswer');
  }

  async uploadFile(file: File, user: string) {
    if (!file) {
      return '';
    }
    const path = `${user}/${file.name}`;
    const ref = this.st.ref(path);
    const res = await ref.put(file);
    return path;
  }

  async getFileUrlByPath(path = '') {
    if (!path) {
      return '';
    }
    const url = await this.st
      .ref(path)
      .getDownloadURL()
      .toPromise();
    return url;
  }

  saveFormAnswer(answer: Answer, user: string, html: string) {
    return new Promise<string>(async (res, rej) => {
      try {
        const sendTime = Date.now();
        for (const tool of answer.tools) {
          const fileElem = tool.find(el => el.isFile);
          if (fileElem && fileElem.value) {
            const path = await this.uploadFile(fileElem.value, user);
            const url = await this.getFileUrlByPath(path);
            fileElem.value = { path, url };
          }
        }
        answer = this.toObj(answer);
        this.functions
          .httpsCallable('sendMail')({
            user,
            answer,
            answerHtml: html,
            sendTime
          })
          .subscribe(
            _ => {
              res('Заявка успешно отправлена');
            },
            err => {
              rej(`Произошла ошибка при отправке сообщения: ${err.message}`);
            }
          );
      } catch (err) {
        rej(err.message);
      }
    });
  }

  toObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

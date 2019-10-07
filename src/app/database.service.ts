import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { utc } from 'moment';
import { AngularFireStorage } from '@angular/fire/storage';

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
  constructor(private db: AngularFirestore, private st: AngularFireStorage) {}

  get formAnswerCollection() {
    return this.db.collection('formAnswer');
  }

  async uploadFile(file: File, user: string, date: number) {
    if (!file) {
      return '';
    }
    const path = `${user}/${date}/${file.name}`;
    const ref = this.st.ref(path);
    const res = await ref.put(file);
    console.log(path, ref, res);
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

  async saveFormAnswer(answer: Answer, user: string) {
    try {
      const sendTime = Date.now();
      for (const tool of answer.tools) {
        const fileElem = tool.find(el => el.isFile);
        if (fileElem) {
          const path = await this.uploadFile(fileElem.value, user, sendTime);
          const url = await this.getFileUrlByPath(path);
          fileElem.value = { path, url };
        }
      }
      answer.tools = answer.tools.map((el: Item[]) => ({ tool: el }));
      await this.formAnswerCollection.add({
        user,
        answer: this.toObj(answer),
        sendTime
      });
      alert('ok');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  toObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
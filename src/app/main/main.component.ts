import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  FormControl
} from '@angular/forms';
import { rendererTypeName } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  mainForm = this.fb.group({
    sender: this.fb.group({
      type: ['', Validators.required],
      companyName: [''],
      UPN: [''],
      FIO: [''],
      contactFace: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required]
    }),
    downloadingAddress: this.fb.group({
      settlement: ['', Validators.required],
      street: ['', Validators.required],
      house: ['', Validators.required],
      building: ['', Validators.required],
      apartment: ['', Validators.required],
      downloadingDate: ['', Validators.required]
    })
  });

  senderTypeSubscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const upn = this.mainForm.get('sender.UPN');
    const cm = this.mainForm.get('sender.companyName');
    const fio = this.mainForm.get('sender.FIO');
    this.senderTypeSubscription = this.mainForm
      .get('sender.type')
      .valueChanges.subscribe(value => {
        upn.setValidators([this.userTypeValidator(value, 'y')]);
        cm.setValidators([this.userTypeValidator(value, 'y')]);
        fio.setValidators([this.userTypeValidator(value, 'f')]);
      });
  }

  ngOnDestroy() {
    this.senderTypeSubscription.unsubscribe();
  }

  get senderType() {
    return this.mainForm.get('sender.type').value;
  }

  private userTypeValidator(curType: string, needType: string) {
    console.log(curType);
    return (control: FormControl): ValidationErrors => {
      console.log(curType === needType, curType, needType);
      if (curType === needType) {
        return control.value.length ? null : { required: true };
      }
      return null;
    };
  }
}

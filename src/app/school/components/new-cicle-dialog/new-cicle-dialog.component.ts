import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './new-cicle-dialog.component.html',
  styleUrls: ['./new-cicle-dialog.component.scss'],
})
export class NewCicleDialogComponent {
  formData: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<NewCicleDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = this.fb.group({
      yi: new FormControl(data.yearInit, Validators.required),
      yf: new FormControl(data.yearFinal),
    });
  }
  close() {
    this.dialogRef.close();
  }
  resetData() {
    this.formData.reset();
  }
  saveData() {
    if (this.formData.valid) {
      this.dialogRef.close({
        yearInit: this.formData.controls['yi'].value,
        yearFinal: this.formData.controls['yf'].value,
      });
    }
  }
}

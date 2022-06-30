import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-school-cycle-dialog',
  templateUrl: './add-school-cycle-dialog.component.html',
  styleUrls: ['./add-school-cycle-dialog.component.scss']
})
export class AddSchoolCycleDialogComponent implements OnInit {
  formData: UntypedFormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddSchoolCycleDialogComponent>,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      begin: new UntypedFormControl('', Validators.required),
      end: new UntypedFormControl('', Validators.required),
      isCurrentDefault: new UntypedFormControl(false, Validators.required),
    });
    if (!this.data.isNew) {
      const splitArr = this.data.cycle.label.split('-');
      const begin = splitArr[0];
      const end = splitArr[1];
      this.formData.patchValue({
        begin: new UntypedFormControl(begin, Validators.required),
        end: new UntypedFormControl(end, Validators.required),
        isCurrentDefault: new UntypedFormControl(this.data.cycle.isCurrentDefault, Validators.required),
      });
    }

  }
  saveData() {
    this.dialogRef.close({
      cycle: {
        id: 'CE' + this.formData.controls.begin.value + this.formData.controls.end.value,
        label: this.formData.controls.begin.value + '-' + this.formData.controls.end.value,
        isCurrentDefault: this.formData.controls.isCurrentDefault.value,
      },
      isNew: this.data.isNew,
    });
  }
  close() {
    this.dialogRef.close();
  }
  resetData() {
    this.formData.reset();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cycle } from '@rds-school/models/school-course.model';

@Component({
  templateUrl: './select-cycle-dialog.component.html',
  styleUrls: ['./select-cycle-dialog.component.scss']
})
export class SelectCycleDialogComponent implements OnInit {
  cycleKeys;
  cycles = Cycle;
  selectedCycle;
  constructor(
    private dialogRef: MatDialogRef<SelectCycleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cycleKeys = Object.keys(this.cycles);
  }

  ngOnInit(): void {
  }
  saveData() {
    this.dialogRef.close(this.selectedCycle);
  }
  close() {
    this.dialogRef.close();
  }
  resetData() {
    this.selectedCycle = null;
  }
}

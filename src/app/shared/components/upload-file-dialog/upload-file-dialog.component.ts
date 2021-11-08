import { Component, Directive, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectionList } from "@angular/material/list";
import { SchoolCourse } from "@rds-school/school-courses/models/school-course.model";
import * as XLSX from 'xlsx';
@Component({
  styleUrls: ['upload-file-dialog.component.scss'],
  templateUrl: 'upload-file-dialog.component.html',

})
export class UploadFileDialogComponent {
  @ViewChild('selectedCourses') selectedCourses: MatSelectionList;
  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { output: SchoolCourse[] }
  ) {

  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const outputArray = XLSX.utils.sheet_to_json(ws, { header: 1 });
      outputArray.forEach((row, i) => {
        if (i > 0) {
          const course: Partial<SchoolCourse> = {
            priority: row[0],
            grade: row[1],
            name: row[2],
            courseType: row[3],
            description: row[4],
          };
          this.data.output.push(course as SchoolCourse);
        }
      });
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  selectAll() {
    this.selectedCourses.selectAll();
  }
  saveData() {

    this.dialogRef.close(this.data);

  }
  close() {
    this.dialogRef.close();
  }
}

import { SelectionModel } from "@angular/cdk/collections";
import { Component, Directive, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectionList } from "@angular/material/list";
import { Cycle, SchoolClassroom, SchoolCourse } from "@rds-school/models/school-course.model";
import { SchoolClassroomsService, SchoolService } from "@rds-school/services";
import { SchoolClassroomsEntityService } from "@rds-store/school/school-classrooms/school-classrooms-entity.service";
import { SchoolCoursesEntityService } from "@rds-store/school/school-courses/school-courses-entity.service";
import { Observable } from "rxjs";
import * as XLSX from 'xlsx';
import { update } from '@angular/fire/database';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SchoolLevel } from "@rds-auth/models/user.enum";
@Component({
  styleUrls: ['upload-file-dialog.component.scss'],
  templateUrl: 'upload-file-dialog.component.html',
})
export class UploadFileDialogComponent {
  importing: boolean = false;
  selectionRemain: Observable<number>;
  cycles = Cycle;
  cycleKeys;
  levels = SchoolLevel;
  levelKeys;
  @ViewChild('selCourses') selCourses: MatSelectionList;
  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private schoolService: SchoolService,
    @Inject(MAT_DIALOG_DATA) public data: { output: any[] }
  ) {
    this.selectionRemain = this.schoolCoursesEntityService.count$;
    this.levelKeys = Object.keys(this.levels);
    this.cycleKeys = Object.keys(this.cycles);
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
            priority: row[1],
            grade: row[2],
            name: row[0],
            courseType: row[3],
            description: row[4],
            cycle: row[5],
            teacherEmail: row[6],
          };
          this.data.output.push({ ...course as SchoolCourse, isImported: false });
        }
      });
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  selectAll() {
    this.selCourses.selectAll();
  }
  deselectAll() {
    this.selCourses.deselectAll();
  }
  import() {
    this.importing = true;
    this.data.output.forEach((course, i) => {
      this.schoolService.getWithGradeAndCycle(course.grade, course.cycle).pipe(
        mergeMap(schoolClassroom => this.schoolCoursesEntityService.add(course).pipe(
          map(newCourse => this.schoolService.addCourseIdToClassroom(schoolClassroom.id, newCourse.id))
        ))
      ).subscribe();
    });
    /*     this.cycleKeys.forEach(cycle =>
          this.levelKeys.forEach(level => {
            console.log(cycle, level);
            level !== 'MATERNAL_00' ?
              courses[cycle.toString()][level.toString()] = this.data.output.filter(course => course.grade === level && course.cycle === cycle) as SchoolCourse[] :
              null
          })); */


    /* const schoolCourses= this.data.output.map(async (course: SchoolCourse, i: number) =>
      await this.schoolCoursesEntityService.add({
        cycle: course.cycle,
        name: course.name,
        description: course.description,
        courseType: course.courseType,
        teacherEmail: course.teacherEmail,
        grade: course.grade,
        priority: course.priority,
      } as SchoolCourse).toPromise().then(
        async (newCourse) => await this.schoolClassroomService.getWithGradeAndCycle(newCourse.grade, newCourse.cycle).toPromise().then(
          async (classrooms) => {
            classrooms[0].coursesIds.push(course.id);
            await this.schoolClassroomService.update(classrooms[0].id, classrooms[0]).toPromise();
          },
          () => { this.data.output[i].isImported = false }
        ))
    ); */
  }
  close() {
    this.dialogRef.close();
  }
}

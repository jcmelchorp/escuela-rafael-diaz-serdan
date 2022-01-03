import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cycle, SchoolClassroom, SchoolCourse } from '../../models/school-course.model';
import { MatDialog } from '@angular/material/dialog';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { NewAccountComponent, NewAccountConfirmComponent } from '@rds-accounts/components';
import { UserRole, SchoolLevel } from '@rds-auth/models/user.enum';
import { SelectCycleDialogComponent, SchoolCourseDialogComponent, SchoolClassroomDialogComponent, UploadFileDialogComponent } from '@rds-school/components';
import { SchoolClassroomsService } from '@rds-school/services';
import { heightReveal } from '@rds-shared/animations/fade-in.animation';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { User } from '@rds-auth/models/user.model';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-school-classrooms',
  templateUrl: './school-classrooms.component.html',
  styleUrls: ['./school-classrooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [heightReveal],
})
export class SchoolClassroomsComponent implements OnInit {
  @ViewChild('targetScroll', { static: true }) targetScroll: HTMLElement;
  classrooms$: Observable<SchoolClassroom[]>;
  //classroom$: BehaviorSubject<SchoolClassroom> = new BehaviorSubject(null);
  classroom$: Observable<SchoolClassroom>;
  coursesCount$: Observable<number>;
  filledClassroom: SchoolClassroom;
  roles = UserRole;
  cycles = Cycle;
  levels = SchoolLevel;
  selClassroom: SchoolClassroom;
  constructor(
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private schoolClassroomsEntityService: SchoolClassroomsEntityService,
    private schoolClassroomsService: SchoolClassroomsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.coursesCount$ = this.schoolCoursesEntityService.count$;
    this.classrooms$ = this.schoolClassroomsEntityService.filteredEntities$;
  }

  notify(classroomId: string) {
    this.classroom$ = this.classrooms$.pipe(map(classrooms => classrooms.find(c => c.id === classroomId)));
  }
  setFilter(cycle?: string) {
    this.schoolClassroomsEntityService.setFilter({ cycle: cycle });
  }
  async classroomToPDF(classroom: SchoolClassroom) {
    console.log(classroom);
    const buildTableBody = (data, columns) => {
      var body = [];
      //body.push(columns);
      data.forEach((row) => {
        var dataRow = [];
        columns.forEach((column) => {
          dataRow.push(row[column]);
        });

        body.push(dataRow);
      });

      return body;
    }
    const getBase64ImageFromURL = (url) => {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = error => {
          reject(error);
        };
        img.src = url;
      });
    }

    var docDefinition = {
      header: {
        margin: 40,
        columns: [
          {
            // usually you would use a dataUri instead of the name for client-side printing
            // sampleImage.jpg however works inside playground so you can play with it
            image: await getBase64ImageFromURL(
              '/assets/images/rds-newlogo-transparent.png'),
            width: 95
          },

        ]
      }, content: [
        {
          text: 'Escuela Rafael Díaz Serdán',
          fontSize: 20,
          alignment: 'center',
          color: '#0060a0',
          bold: true,
        },

        {
          text: 'Lista de grupo',
          fontSize: 16,
          bold: false,
          alignment: 'center',
        },
        {
          text: `Grado: ${this.levels[classroom.grade]}`,
          alignment: 'center',
          bold: true
        },
        {
          text: `Ciclo escolar: ${this.cycles[classroom.cycle]}`,
          alignment: 'center'
        },
        {
          text: `Fecha de consulta: ${new Date().toLocaleString()}`,
          alignment: 'center'
        },
        {
          margin: [0, 30],
          text: 'Lista de Alumnos',
          fontSize: 14,
          bold: false,
          alignment: 'left',
        },
        {
          fontSize: 8,
          layout: {
            hLineWidth: (i, node) => { return (i === 0 || i === 1 || i === -1) ? 1 : 0; },
            vLineWidth: (i, node) => { return (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6) ? 1 : 0; },
            hLineColor: (i, node) => { return (i === 0 || i === -1) ? '#101010' : '#0060a0'; },
            vLineColor: (i, node) => { return (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6) ? '#080808' : '#ffffff' },
            paddingBottom: (i, node) => {
              switch (i) {
                case 0:
                  return 0;
                case 1:
                  return 0;
                default:
                  return 0;
              }
            },
            paddingTop: (i, node) => {
              switch (i) {
                case 0:
                  return 0;
                case 1:
                  return 0;
                default:
                  return 0;
              }
            }
          },
          table: {
            headerRows: 0,
            widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto'],
            //heights: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            alignment: 'center',
            body: [
              [
                { text: 'Apellido(s)', alignment: 'center' },
                { text: 'Nombre(s)', alignment: 'center' },
                { text: 'Correo Electrónico', alignment: 'center' },
                { text: 'Fecha de Nacimiemto', alignment: 'center', fontSize: 7 },
                { text: 'CURP', alignment: 'center' },
                { text: 'NIEV', alignment: 'center' },
              ],
              ...buildTableBody(classroom.students.map(student => {
                return {
                  familyName: student.name.familyName,
                  givenName: student.name.givenName,
                  primaryEmail: student.primaryEmail,
                  dob: student.dob || 'n/a',
                  curp: student.curp || 'n/a',
                  niev: student.niev || 'n/a',
                }
              }), ['familyName', 'givenName', 'primaryEmail', 'dob', 'curp', 'niev'])
            ]
          }
        },
        {
          margin: [0, 30],
          text: 'Lista de Materias',
          fontSize: 14,
          bold: false,
          alignment: 'left',
        },
        {
          fontSize: 8,
          layout: {
            hLineWidth: (i, node) => { return (i === 0 || i === 1 || i === -1) ? 1 : 0; },
            vLineWidth: (i, node) => { return (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6) ? 1 : 0; },
            hLineColor: (i, node) => { return (i === 0 || i === -1) ? '#101010' : '#0060a0'; },
            vLineColor: (i, node) => { return (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6) ? '#080808' : '#ffffff' },
            paddingBottom: (i, node) => {
              switch (i) {
                case 0:
                  return 0;
                case 1:
                  return 0;
                default:
                  return 0;
              }
            },
            paddingTop: (i, node) => {
              switch (i) {
                case 0:
                  return 0;
                case 1:
                  return 0;
                default:
                  return 0;
              }
            }
          },
          table: {
            headerRows: 0,
            widths: ['auto', 'auto'],
            alignment: 'center',
            body: [
              [
                { text: 'Nombre de la materia', alignment: 'center' },
                { text: 'Profesor titular', alignment: 'center' },

              ],
              ...buildTableBody(classroom.courses.map(course => {
                return {
                  name: course.name,
                  teacherEmail: course.teacherEmail || 'n/a'
                }
              }), ['name', 'teacherEmail'])
            ]
          }
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },
        tableHeader: {
          bold: true,
        }
      }
    };
    pdfMake.createPdf(docDefinition as unknown as TDocumentDefinitions).open();
  }
  deleteClassroom(id: string) {
    this.schoolClassroomsEntityService.delete(id);
  }
  openSaveUser() {
    const user: User = this.blankUser();
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '60%',
      minWidth: '500px',
      height: 'fit-content',
      minHeight: '400px',
      data: { user, action: 'crea', isInGoogle: false },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        console.log('Creating New User Canceled');
      } else {
        this.dialog.open(NewAccountConfirmComponent, {
          data: { ...result },
        });
      }
    });
  }
  blankUser() {
    let user: User = {
      id: '',
      password: '',
      primaryEmail: '',
      name: {
        givenName: '',
        familyName: '',
        fullName: '',
      },
      isHuman: true,
      gender: '',
      dob: '',
      role: '',
      orgUnitPath: '',
      level: '',
      grade: '',
    };
    return user;
  }

  openSchoolCourseDialog(course?: SchoolCourse) {
    const newCourse: Partial<SchoolCourse> = {};
    const dialogRef = this.dialog.open(SchoolCourseDialogComponent, {
      width: 'fit-content',
      minWidth: '480px',
      height: 'fit-content',
      maxHeight: '600px',
      data: course
        ? { course: course, isNew: false }
        : { course: newCourse, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          let ids: string[] = [];
          this.schoolCoursesEntityService.add(result.course).pipe(
            map(course => this.schoolClassroomsService.getWithQuery({ grade: course.grade }).pipe(
              map(classrooms => {

                const classroom = classrooms.find(cl => cl.cycle === course.cycle);
                //ids.push(...classrooms[0].coursesIds);
                ids.push(course.id);
                return {
                  id: classroom.id,
                  grade: classroom.grade,
                  cycle: classroom.cycle,
                  studentsEmails: classroom.studentsEmails,
                  coursesIds: ids
                } as SchoolClassroom;
              })
            ).subscribe(classroom => this.schoolClassroomsEntityService.update({ ...classroom }))),
          )

        } else {
          this.schoolCoursesEntityService.update(result.course);
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  openSchoolClassroomDialog(classroom?: SchoolClassroom) {
    const dialogRef = this.dialog.open(SchoolClassroomDialogComponent, {
      width: 'fit-content',
      minWidth: '400px',
      height: 'fit-content',
      data: classroom
        ? { classroom: classroom, isNew: false }
        : { classroom: new SchoolClassroom({ grade: null, cycle: null }), isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.classroom);
        if (result.isNew) {
          this.schoolClassroomsEntityService.add({ ...result.classroom });
        } else {
          this.schoolClassroomsEntityService.update({ ...result.classroom });
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }

  loadCoursesFile() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      width: 'fit-content',
      minWidth: '700px',
      height: 'fit-content',
      data: { output: [] },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {


      } else {
        console.log('Dialog closed without changes')
      }
    });
  }


}

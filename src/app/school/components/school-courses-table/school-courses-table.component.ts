import { Component, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { SchoolCourse, Cycle } from '../../models/school-course.model';
import { Observable } from 'rxjs';
import { map, tap, switchMap, mergeMap, pluck, concatMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '@rds-shared/components';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddStudentsCoursesComponent } from '../add-students-courses/add-students-courses.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TableGroup } from '@rds-school/models/table-group.model';
import { SchoolCoursesEntityService } from '@rds-store/school/school-courses/school-courses-entity.service';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { User } from '@rds-auth/models/user.model';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { SchoolCourseDialogComponent } from '..';
import { COURSE_SCHEME } from '../../models/school-schemes.model';
@Component({
  selector: 'app-school-courses-table',
  templateUrl: './school-courses-table.component.html',
  styleUrls: ['./school-courses-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SchoolCoursesTableComponent implements OnInit/* , AfterViewInit  */ {
  //@ViewChild(MatTable) table: MatTable<MatTableDataSource<any | TableGroup>>;
  @ViewChild(MatSort) sort: MatSort;
  @Output() onClickEdit = new EventEmitter<SchoolCourse>();
  @Output() onClickDelete = new EventEmitter<string>();
  @Output() onClickStudents = new EventEmitter<SchoolCourse>();
  faAward = faAward;
  cycles = Cycle;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  filterValues: FormGroup;
  courses$: Observable<SchoolCourse[]>;
  teachers$: Observable<User[]>;
  filteredCourses$: Observable<SchoolCourse[]>;
  courses: any[];
  coursesCount$: Observable<number>;
  gradeKeys;
  grades = SchoolLevel;
  dataSource = new MatTableDataSource<any | TableGroup>([]);
  //_alldata: any[];
  columnsToDisplay: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];
  isLoading: boolean;
  dataSchema = COURSE_SCHEME;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  constructor(
    private fb: FormBuilder,
    private schoolCoursesEntityService: SchoolCoursesEntityService,
    private dialog: MatDialog
  ) {
    this.columnsToDisplay = [
      {
        propertyName: 'cycle',
        headerText: 'Ciclo escolar',
      },
      {
        propertyName: 'grade',
        headerText: 'Grado',
      },
      {
        propertyName: 'priority',
        headerText: '',
      },
      {
        propertyName: 'name',
        headerText: 'Nombre',
      },
      {
        propertyName: 'teacherEmail',
        headerText: '',
      },
      {
        propertyName: 'isEdit',
        headerText: '',
      },
    ];
    this.gradeKeys = Object.keys(this.grades);
    this.filterValues = this.fb.group({
      grade: new FormControl(),
      name: new FormControl(),
    });
    this.filterValues.valueChanges.subscribe((changes) => {
      Object.keys(changes).forEach(
        (key) => changes[key] == null && delete changes[key]
      );
      Object.keys(changes).includes('name') && changes.name !== ''
        ? (changes.name = { fullName: changes['name'] })
        : delete changes.name;
      return this.schoolCoursesEntityService.setFilter(changes);
    });
    this.displayedColumns = [...this.columnsToDisplay.map((column) => column.propertyName), 'actions'];
    this.groupByColumns = ['cycle', 'grade'];

  }

  ngOnInit() {
    this.loaded$ = this.schoolCoursesEntityService.loaded$;
    this.loading$ = this.schoolCoursesEntityService.loading$;
    this.courses$ = this.schoolCoursesEntityService.entities$;
    //this.teachers$ = this.schoolTeachersEntityService.entities$;
    this.filteredCourses$ = this.schoolCoursesEntityService.filteredEntities$.pipe(
      map(courses => {
        this.courses = courses.map(user => { return { ...user, isNameEditable: false, isTeacherEmailEditable: false } });
        this.dataSource.data = this.addTableGroups(this.courses, this.groupByColumns);
        this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
        this.dataSource.filter = performance.now().toString();
        return courses;
      })
    );
  }
  openSchoolCourseDialog(course?: SchoolCourse) {
    console.log(course);
    const dialogRef = this.dialog.open(SchoolCourseDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: course
        ? { course: course, isNew: false }
        : { course: {}, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.schoolCoursesEntityService.add({ ...result.course });
        } else {
          console.log(result)
          this.schoolCoursesEntityService.update({ ...result.course });
        }
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }
  editProperty(update: any) {
    this.schoolCoursesEntityService.update(update);
  }
  groupBy(event, column) {
    event.stopPropagation();
    this.checkTableGroupByColumn(column.propertyName, true);
    this.dataSource.data = this.addTableGroups(this.courses, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }

  checkTableGroupByColumn(propertyName, add) {
    let found = null;
    for (const column of this.groupByColumns) {
      if (column === propertyName) {
        found = this.groupByColumns.indexOf(column, 0);
      }
    }
    if (found != null && found >= 0) {
      if (!add) {
        this.groupByColumns.splice(found, 1);
      }
    } else {
      if (add) {
        this.groupByColumns.push(propertyName);
      }
    }
  }
  unTableGroupBy(event, column) {
    event.stopPropagation();
    this.checkTableGroupByColumn(column.propertyName, false);
    this.dataSource.data = this.addTableGroups(this.courses, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }
  // below is for grid row grouping
  customFilterPredicate(data: any | TableGroup, filter: string): boolean {
    return (data instanceof TableGroup) ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter(
      row => {
        if (!(row instanceof TableGroup)) {
          return false;
        }
        let match = true;
        this.groupByColumns.forEach(column => {
          if (!row[column] || !data[column] || row[column] !== data[column]) {
            match = false;
          }
        });
        return match;
      }
    );

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as TableGroup;
    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString();  // bug here need to fix
  }
  addTableGroups(data: any[], groupByColumns: string[]): any[] {
    const rootTableGroup = new TableGroup();
    rootTableGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootTableGroup);
  }
  getSublevel(data: any[], level: number, groupByColumns: string[], parent: TableGroup): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result = new TableGroup();
          result.level = level + 1;
          result.parent = parent;
          for (let i = 0; i <= level; i++) {
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];
    let subTableGroups = [];
    groups.forEach(group => {
      const rowsInTableGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      group.totalCounts = rowsInTableGroup.length;
      const subTableGroup = this.getSublevel(rowsInTableGroup, level + 1, groupByColumns, group);
      subTableGroup.unshift(group);
      subTableGroups = subTableGroups.concat(subTableGroup);
    });
    return subTableGroups;
  }
  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isTableGroup(index, item): boolean {
    return item.level;
  }

  openStudentsToCourse(row) {
    const course: SchoolCourse = { ...row };
    const dialogRef = this.dialog.open(AddStudentsCoursesComponent, {
      width: '400px',
      minHeight: '500px',
      height: 'fit-content',
      data: { course }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onClickStudents.emit(result.course);
      }
      else {
        console.log('The dialog was closed');
      }
    });
  }

  deleteSchoolCourse(course: SchoolCourse) {
    const subject: any = {
      id: course.id,
      action: 'elimina',
      subject: 'clase',
      confirm: false,
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      height: 'fit-content',
      data: {
        ...subject,
        title: `¿Está seguro de ${subject.action}r la ${subject.subject} ${course.name} ${this.grades[course.grade]}?`,
        message: `La ${subject.subject} se ${subject.action}rá de la base de datos y no podrá ser recuperada.`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirm) {
        //this.onClickDelete.emit(result.id);
        this.schoolCoursesEntityService.delete(result.id);
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }
}

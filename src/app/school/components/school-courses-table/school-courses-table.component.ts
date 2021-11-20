import { Component, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { AssignedCourse, Cycle } from '../../models/school-course.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '@rds-shared/components';
import { MatDialog } from '@angular/material/dialog';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddStudentsCoursesComponent } from '../add-students-courses/add-students-courses.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TableGroup } from '@rds-school/models/table-group.model';
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

export class SchoolCoursesTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<MatTableDataSource<any | TableGroup>>;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() onClickEdit = new EventEmitter<AssignedCourse>();
  @Output() onClickDelete = new EventEmitter<string>();
  @Output() onClickStudents = new EventEmitter<AssignedCourse>();
  cycles = Cycle;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  filterValues: FormGroup;
  schoolCourses$: Observable<AssignedCourse[]>;
  filteredCourses$: Observable<AssignedCourse[]>;
  schoolCourses: AssignedCourse[];
  coursesCount$: Observable<number>;
  gradeKeys;
  grades = SchoolLevel;
  dataSource = new MatTableDataSource<any | TableGroup>([]);
  //_alldata: any[];
  columns: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];
  isLoading: boolean;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  constructor(
    private fb: FormBuilder,
    private assignedCoursesEntityService: AssignedCoursesEntityService,
    private dialog: MatDialog
  ) {
    this.loaded$ = this.assignedCoursesEntityService.loaded$;
    this.loading$ = this.assignedCoursesEntityService.loading$;
    this.gradeKeys = Object.keys(this.grades);
    this.columns = [
      { field: 'priority', label: '' },
      { field: 'cycleId', label: 'Ciclo escolar' },
      { field: 'grade', label: 'Grado' },
      { field: 'name', label: 'Nombre' },
      { field: 'teacherEmail', label: 'Profesor' },
      { field: 'isEdit', label: '' }
    ];
    this.displayedColumns = [...this.columns.map((column) => column.field), 'actions'];
    this.groupByColumns = ['cycleId', 'grade'];
    this.coursesCount$ = this.assignedCoursesEntityService.count$
    this.schoolCourses$ = this.assignedCoursesEntityService.entities$
  }
  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }

  ngOnInit() {
    this.schoolCourses$.subscribe(
      (courses) => {
        this.schoolCourses = courses;
        this.dataSource.data = this.addTableGroups(this.schoolCourses, this.groupByColumns);
        this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
        this.dataSource.filter = performance.now().toString();
      },
      (err: any) => console.log(err)
    );

  }


  groupBy(event, column) {
    event.stopPropagation();
    this.checkTableGroupByColumn(column.field, true);
    this.dataSource.data = this.addTableGroups(this.schoolCourses, this.groupByColumns)
    this.dataSource.filter = performance.now().toString();
  }

  checkTableGroupByColumn(field, add) {
    let found = null;
    for (const column of this.groupByColumns) {
      if (column === field) {
        found = this.groupByColumns.indexOf(column, 0);
      }
    }
    if (found != null && found >= 0) {
      if (!add) {
        this.groupByColumns.splice(found, 1);
      }
    } else {
      if (add) {
        this.groupByColumns.push(field);
      }
    }
  }
  unTableGroupBy(event, column) {
    ;
    event.stopPropagation();
    this.checkTableGroupByColumn(column.field, false);
    this.dataSource.data = this.addTableGroups(this.schoolCourses, this.groupByColumns);
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
    const rootGroup = new TableGroup();
    rootGroup.expanded = false;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
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
    const dialogRef = this.dialog.open(AddStudentsCoursesComponent, {
      width: '400px',
      minHeight: '500px',
      height: 'fit-content',
      data: { course: row as AssignedCourse }
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
  editAssignedCourse(course?: AssignedCourse) {
    this.onClickEdit.emit(course);
  }
  deleteAssignedCourse(course: AssignedCourse) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '400px',
      data: {
        id: course.id,
        action: 'elimina',
        subject: 'Clase',
        confirm: false,
        title: `¿Está seguro de que desea eliminar la clase ${course.name} de ${course.grade}?`,
        message:
          'La clase se eliminará de la base de datos.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirm) {
        console.log(result.id)
        this.onClickDelete.emit(result.id);
      } else {
        console.log('Dialog closed without changes')
      }
    });
  }
}

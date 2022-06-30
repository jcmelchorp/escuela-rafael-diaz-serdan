import { Component, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '@rds-shared/components';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddStudentsCoursesComponent } from '../add-students-courses/add-students-courses.component';
import { User } from '@rds-auth/models/user.model';
import { SchoolStudentsEntityService } from '@rds-store/school/school-students/school-students-entity.service';
import { map } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TableGroup } from '@rds-school/models/table-group.model';
import { Cycle } from '@rds-school/models/school-course.model';
@Component({
  selector: 'app-school-students-table',
  templateUrl: './school-students-table.component.html',
  styleUrls: ['./school-students-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SchoolStudentsTableComponent implements OnInit/* , AfterViewInit, OnDestroy  */ {
  @ViewChild(MatSort) sort: MatSort;
  @Output() onClickEdit = new EventEmitter<User>();
  @Output() onClickDelete = new EventEmitter<string>();
  @Output() onClickStudents = new EventEmitter<User>();
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  cycles = Cycle;
  students$: Observable<User[]>;
  filteredStudents$: Observable<User[]>;
  filterValues: UntypedFormGroup;
  gradeKeys;
  grades = SchoolLevel;
  students: any[];
  dataSource = new MatTableDataSource<any | TableGroup>([]);
  //_alldata: any[];
  columnsToDisplay: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];
  isLoading: boolean;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  constructor(
    private fb: UntypedFormBuilder,
    private schoolStudentsEntityService: SchoolStudentsEntityService,
    private dialog: MatDialog
  ) {
    this.gradeKeys = Object.keys(this.grades);

    this.columnsToDisplay = [
      {
        propertyName: 'role',
        headerText: 'Rol',
      },
      {
        propertyName: 'grade',
        headerText: 'Grado',
      },
      {
        propertyName: 'givenName',
        headerText: 'Nombre(s)',
      },
      {
        propertyName: 'familyName',
        headerText: 'Apellido(s)',
      },
    ];
    this.gradeKeys = Object.keys(this.grades);
    this.filterValues = this.fb.group({
      grade: new UntypedFormControl(),
      name: new UntypedFormControl(),
    });
    this.filterValues.valueChanges.subscribe((changes) => {
      Object.keys(changes).forEach(
        (key) => changes[key] == null && delete changes[key]
      );
      Object.keys(changes).includes('name') && changes.name !== ''
        ? (changes.name = { fullName: changes['name'] })
        : delete changes.name;
      return this.schoolStudentsEntityService.setFilter(changes);
    });
    this.displayedColumns = [...this.columnsToDisplay.map((column) => column.propertyName), 'actions'];
    this.groupByColumns = ['grade'];
    this.loading$ = this.schoolStudentsEntityService.loading$;
    this.loaded$ = this.schoolStudentsEntityService.loaded$;
    this.students$ = this.schoolStudentsEntityService.entities$;
    this.filteredStudents$ = this.schoolStudentsEntityService.filteredEntities$.pipe(map(students => {
      this.students = students;
      this.dataSource.data = this.addTableGroups(this.students, this.groupByColumns);
      this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
      this.dataSource.filter = performance.now().toString();
      return students;
    }));
  }

  ngOnInit() {


  }

  /* ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
  ngOnDestroy(): void {
    //this.studentsSubscription.unsubscribe();

  } */
  groupBy(event, column) {
    //this.isLoading = false;
    event.stopPropagation();
    this.checkTableGroupByColumn(column.propertyName, true);
    this.dataSource.data = this.addTableGroups(this.students, this.groupByColumns)
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
    this.dataSource.data = this.addTableGroups(this.students, this.groupByColumns);
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
    const dialogRef = this.dialog.open(AddStudentsCoursesComponent, {
      width: '400px',
      minHeight: '500px',
      height: 'fit-content',
      data: { course: row as User }
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
  editUser(course?: User) {
    this.onClickEdit.emit(course);
  }
  deleteUser(course: User) {
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

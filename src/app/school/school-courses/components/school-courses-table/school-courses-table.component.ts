import { Component, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { AssignedCourse } from '../../models/school-course.model';
import { AccountsEntityService } from '../../../../store/accounts/accounts-entity.service';
import { User } from '@rds-auth/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '@rds-shared/components';
import { MatDialog } from '@angular/material/dialog';
import { AssignedCoursesEntityService } from '../../../../store/school/assigned-courses/assigned-courses-entity.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddStudentsCoursesComponent } from '../add-students-courses/add-students-courses.component';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';


export class Group {
  level = 0;
  parent: Group;
  expanded = false;
  totalCounts = 0;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}
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

export class SchoolCoursesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: AssignedCourse[];
  @ViewChild(MatTable) table!: MatTable<MatTableDataSource<any | Group>>;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() onClickEdit = new EventEmitter<AssignedCourse>();
  @Output() onClickDelete = new EventEmitter<string>();
  @Output() onClickStudents = new EventEmitter<AssignedCourse>();

  teachers$: Observable<User[]>;
  teachers: User[];
  teachersSubscription: Subscription;
  slevels = SchoolLevel;
  dataSource = new MatTableDataSource<any | Group>([]);
  //_alldata: any[];
  columns: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];
  isLoading: boolean;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  constructor(private schoolTeachersEntityService: SchoolTeachersEntityService, private dialog: MatDialog) {
    this.columns = [
      { field: 'cycle', label: 'Ciclo escolar' },
      { field: 'grade', label: 'Grado' },
      { field: 'priority', label: '' },
      { field: 'name', label: 'Nombre' },
      { field: 'teacherEmail', label: 'Profesor' },
      { field: 'isEdit', label: '' }
    ];
    this.displayedColumns = [...this.columns.map((column) => column.field), 'actions'];
    this.groupByColumns = ['cycle', 'grade'];
  }

  ngOnInit() {
    this.teachersSubscription = this.schoolTeachersEntityService.entities$.subscribe(teachers => this.teachers = teachers);
    this.dataSource.data = this.addGroups(this.data.sort((a, b) => {
      if (a.priority < b.priority) {
        return -1;
      }
      if (a.priority > b.priority) {
        return 1;
      }
      return 0;
    }), this.groupByColumns);
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    this.dataSource.filter = performance.now().toString();
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
  ngOnDestroy(): void {
    this.teachersSubscription.unsubscribe();

  }
  groupBy(event, column) {
    this.isLoading = false;
    event.stopPropagation();
    this.checkGroupByColumn(column.field, true);
    this.dataSource.data = this.addGroups(this.data, this.groupByColumns)
    this.dataSource.filter = performance.now().toString();
  }

  checkGroupByColumn(field, add) {
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
  unGroupBy(event, column) {
    ;
    event.stopPropagation();
    this.checkGroupByColumn(column.field, false);
    this.dataSource.data = this.addGroups(this.data, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }
  // below is for grid row grouping
  customFilterPredicate(data: any | Group, filter: string): boolean {
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter(
      row => {
        if (!(row instanceof Group)) {
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
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString();  // bug here need to fix
  }
  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }
  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result = new Group();
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
    let subGroups = [];
    groups.forEach(group => {
      const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }
  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
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

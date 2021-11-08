import { Component, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AssignedCourse } from '../../models/school-course.model';


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
})
export class SchoolCoursesTableComponent implements OnInit, AfterViewInit {
  @Input() data: AssignedCourse[];
  @ViewChild(MatTable) table!: MatTable<MatTableDataSource<any | Group>>;
  @Output() onClickEdit = new EventEmitter<AssignedCourse>();
  @Output() onClickDelete = new EventEmitter<string>();
  dataSource = new MatTableDataSource<any | Group>([]);
  //_alldata: any[];
  columns: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];
  isLoading: boolean;
  constructor(
  ) {
    this.columns = [
      { field: 'priority', label: '#' },
      { field: 'grade', label: 'Grado' },
      { field: 'name', label: 'Nombre' },

    ];
    this.displayedColumns = [...this.columns.map((column) => column.field), 'actions'];
    this.groupByColumns = ['grade'];

  }

  ngOnInit() {
    this.isLoading = true;
    this.dataSource.data = this.addGroups(this.data, this.groupByColumns).sort((a, b) => {
      if (a.priority < b.priority) {
        return -1;
      }
      if (a.priority > b.priority) {
        return 1;
      }
      return 0;
    });
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    this.dataSource.filter = performance.now().toString();
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
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
    this.dataSource.data = this.addGroups(this.data, this.groupByColumns).sort((a, b) => {
      if (a[this.groupByColumns[this.groupByColumns.length - 2]] < b[this.groupByColumns[this.groupByColumns.length - 2]]) {
        return -1;
      }
      if (a[this.groupByColumns[this.groupByColumns.length - 2]] > b[this.groupByColumns[this.groupByColumns.length - 2]]) {
        return 1;
      }
      return 0;
    });
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

  editAssignedCourse(course?: AssignedCourse) {
    let completeCourse: AssignedCourse = this.data.find(c => c.id === course.id);
    this.onClickEdit.emit(completeCourse);
  }
  deleteAssignedCourse(course?: AssignedCourse) {
    this.onClickDelete.emit(course.id);
  }
}

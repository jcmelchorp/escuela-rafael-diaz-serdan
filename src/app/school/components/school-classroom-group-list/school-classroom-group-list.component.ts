import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { Cycle, SchoolClassroom } from '@rds-school/models/school-course.model';
import { TableGroup } from '@rds-school/models/table-group.model';
import { AccountsEntityService } from '../../../store/accounts/accounts-entity.service';
import { stagger } from '@angular/animations';

@Component({
  selector: 'app-school-classroom-group-list',
  templateUrl: './school-classroom-group-list.component.html',
  styleUrls: ['./school-classroom-group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SchoolClassroomGroupListComponent implements OnInit {
  @Input() classrooms: SchoolClassroom[];
  @Output() onClassroomEdit: EventEmitter<SchoolClassroom> = new EventEmitter<SchoolClassroom>();
  @Output() onClassroomDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClassroomShow: EventEmitter<string> = new EventEmitter<string>();
  cycles = Cycle;
  cycleKeys: string[];
  levels = SchoolLevel;
  levelKeys: string[];
  dataSource = new MatTableDataSource<any | TableGroup>([]);
  columnsToDisplay: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];
  constructor() {
    this.cycleKeys = Object.keys(this.cycles);
    this.levelKeys = Object.keys(this.levels);
    this.columnsToDisplay = [
      {
        propertyName: 'cycle',
        headerText: 'Ciclo escolar',
      },
      {
        propertyName: 'grade',
        headerText: 'Grado',
      },
    ];
    this.displayedColumns = [...this.columnsToDisplay.map((column) => column.propertyName), 'actions'];
    this.groupByColumns = ['cycle'];


  }
  reloadData() {
    this.dataSource.data = this.addTableGroups(this.classrooms, this.groupByColumns);
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    this.dataSource.filter = performance.now().toString();
  }
  ngOnInit(): void {
    this.reloadData();

  }
  groupBy(event, column) {
    event.stopPropagation();
    this.checkTableGroupByColumn(column.propertyName, true);
    this.dataSource.data = this.addTableGroups(this.classrooms, this.groupByColumns);
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
    this.dataSource.data = this.addTableGroups(this.classrooms, this.groupByColumns);
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
  editClassroom(classroom?: SchoolClassroom) {
    this.onClassroomEdit.emit(classroom);
  }
  showClassroom(classroomId: string) {
    this.onClassroomShow.emit(classroomId);
  }

  deleteClassroom(classroom: SchoolClassroom) {
    this.onClassroomDelete.emit(classroom.id);
  }
}

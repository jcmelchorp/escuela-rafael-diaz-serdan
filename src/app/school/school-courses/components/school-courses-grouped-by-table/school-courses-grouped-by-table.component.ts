import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AssignedCourse } from '@rds-school/school-courses/models/school-course.model';
import { AssignedCoursesEntityService } from '@rds-store/school/assigned-courses/assigned-courses-entity.service';
import { SchoolTeachersEntityService } from '@rds-store/school/school-teachers/school-teacher-entity.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cycle } from '../../models/school-course.model';

@Component({
  selector: 'app-school-courses-grouped-by-table',
  templateUrl: './school-courses-grouped-by-table.component.html',
  styleUrls: ['./school-courses-grouped-by-table.component.scss']
})
export class SchoolCoursesGroupedByTableComponent implements OnInit {
  @Input() initialData: any[];

  displayedColumns: any[];
  columnsToDisplay: string[];
  dataSource = [];
  cycles = Cycle;
  cycleKeys;
  groupingColumn = "grade";
  reducedGroups = [];

  constructor() {
    this.cycleKeys = Object.keys(Cycle);
  }
  ngOnInit(): void {
    // Replace people with any dataArray !
    let inputData = this.initialData;

    if (!this.initData(inputData)) return;
    console.log(inputData);

    this.buildDataSource();
  }

  /**
   * Discovers columns in the data
   */
  initData(data) {
    if (!data) return false;
    this.displayedColumns = [
      { field: 'cycle', label: 'Ciclo escolar' },
      { field: 'grade', label: 'Grado' },
      { field: 'priority', label: '' },
      { field: 'name', label: 'Nombre' },
      { field: 'teacherId', label: 'Profesor' }
    ];
    this.columnsToDisplay = this.displayedColumns.map(col => col.field.toString());
    console.log(this.displayedColumns);
    this.initialData = this.initialData;
    return true;
  }

  /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource() {
    this.dataSource = this.groupBy(this.groupingColumn, this.initialData, this.reducedGroups);
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */
  groupBy(column: string, data: any[], reducedGroups?: any[]) {
    if (!column) return data;
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator, currentValue) => {
      let currentGroup = currentValue[column];
      if (!accumulator[currentGroup])
        accumulator[currentGroup] = [{
          groupName: `${currentValue[column]}`,
          value: currentValue[column],
          isGroup: true,
          reduced: collapsedGroups.some((group) => group.value == currentValue[column])
        }];

      accumulator[currentGroup].push(currentValue);

      return accumulator;
    }
    let groups = data.reduce(customReducer, {});
    let groupArray = Object.keys(groups).map(key => groups[key]);
    let flatList = groupArray.reduce((a, c) => { return a.concat(c); }, []);

    return flatList.filter((rawLine) => {
      return rawLine.isGroup ||
        collapsedGroups.every((group) => rawLine[column] != group.value);
    });
  }

  /**
   * Since groups are on the same level as the data,
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index, item): boolean {
    return item.isGroup;
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row) {
    row.reduced = !row.reduced;
    if (row.reduced)
      this.reducedGroups.push(row);
    else
      this.reducedGroups = this.reducedGroups.filter((el) => el.value != row.value);

    this.buildDataSource();
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SchoolCourse, StudentsCourses } from '../../models/school-course.model';

@Component({
  selector: 'app-students-courses',
  templateUrl: './students-courses.component.html',
  styleUrls: ['./students-courses.component.scss']
})
export class StudentsCoursesComponent {
  @Input() dataArray: SchoolCourse[];
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  filterValues: UntypedFormGroup;
  schoolCourses$: Observable<SchoolCourse[]>;
  filteredEntities$: Observable<SchoolCourse[]>;
  resCount$: Observable<number>;
  gradeKeys;
  grades = SchoolLevel;
  displayedColumns: string[];
  dataSource = [];
  groupingColumn;
  reducedGroups = [];
  initialData: any[];

  constructor(private route: ActivatedRoute) {
    this.route.snapshot.data.courseId
    let inputData = this.dataArray;
    if (!this.initData(inputData)) return;
    this.buildDataSource();
  }

  /**
   * Discovers columns in the data
   */
  initData(data) {
    if (!data) return false;
    this.displayedColumns = Object.keys(data[0]);
    this.initialData = this.dataArray;
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
          groupName: `${column} ${currentValue[column]}`,
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

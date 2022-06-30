import { Component, Input, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UntypedFormGroup } from '@angular/forms';

import { GroupsService } from '@rds-admin/services/groups.service';
import { Group } from '@rds-accounts/models/account-domain.model';




@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupTableComponent implements OnInit {
  @Input()
  data!: Group[] | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<Group>;
  dataSource!: MatTableDataSource<Group>;
  searchForm!: UntypedFormGroup;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'directMembersCount', 'email'];
  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data!);
    //this.dataSource.filterPredicate = this.getFilterPredicate();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onDbBackup() {
    this.data?.map(async group => {
      const newGroup: Group = { ...group, grade: undefined, level: null || undefined, priority: undefined, students: [], teachers: [] }
      await this.groupsService.createGroup(newGroup);
    });
  }

}

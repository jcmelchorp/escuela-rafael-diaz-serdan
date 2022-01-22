import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SchoolCyclesDataSource } from './school-cycles-datasource';
import { SchoolCycle } from '../../models/school-course.model';
import { SchoolCyclesEntityService } from '../../../store/school/school-cycles/school-cycles-entity.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSchoolCycleDialogComponent } from '@rds-school/components/add-school-cycle-dialog/add-school-cycle-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-school-cycles',
  templateUrl: './school-cycles.component.html',
  styleUrls: ['./school-cycles.component.scss']
})
export class SchoolCyclesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  cycles$: Observable<SchoolCycle[]>
  @ViewChild(MatTable) table!: MatTable<SchoolCycle>;
  dataSource: SchoolCyclesDataSource;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'label', 'isCurrentDefault'];

  constructor(
    private schoolCyclesEntityService: SchoolCyclesEntityService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.loaded$ = this.schoolCyclesEntityService.loaded$;
    this.loading$ = this.schoolCyclesEntityService.loading$;

    this.cycles$ = this.schoolCyclesEntityService.entities$.pipe(map(schoolCycles => {
      this.dataSource = new SchoolCyclesDataSource(schoolCycles);
      return schoolCycles;
    }));
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  updateDefaultCycle(cycleToUpdate: SchoolCycle) {
    this.schoolCyclesEntityService.update(cycleToUpdate);
  }
  addCycle() {
    const newCycle: SchoolCycle = { id: '', label: '', isCurrentDefault: false };
    const dialogRef = this.dialog.open(AddSchoolCycleDialogComponent, {
      width: '400px',
      height: '400px',
      data: { cycle: newCycle, isNew: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.cycle) {
        this.schoolCyclesEntityService.add(result.cycle);
      }
    });
  }
}

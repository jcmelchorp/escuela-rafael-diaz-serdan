import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '@rds-shared/components';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChangeGradeComponent } from './../change-grade/change-grade.component';
import { UserEditDialogComponent } from './../user-edit-dialog/user-edit-dialog.component';
import { SchoolLevel, UserRole } from '@rds-auth/models/user.enum';
import { User } from '@rds-auth/models/user.model';
import { AppState } from '@rds-store/app.state';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { selectAccounts } from '../../state/accounts.selectors';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  loaded$: Observable<boolean>;
  loading$!: Observable<boolean>;
  users$!: Observable<User[]>;
  dataSource!: MatTableDataSource<User>;
  roleKeys: string[];
  roles = UserRole;
  gradeKeys: string[];
  grades = SchoolLevel;
  selection = new SelectionModel<User>(true, []);
  filterValues: UntypedFormGroup;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsToDisplay = [
    {
      propertyName: 'givenName',
      headerText: 'Nombre',
    },
    {
      propertyName: 'familyName',
      headerText: 'Apellido',
    },
    {
      propertyName: 'grade',
      headerText: 'Grado',
    },
    {
      propertyName: 'role',
      headerText: 'Rol',
    },
  ];
  displayedColumns: string[] = [
    'select',
    'badges',
    ...this.columnsToDisplay.map((c) => c.propertyName),
    'actions',
  ];
  dialogSub!: Subscription;
  confirmGroupSub!: Subscription;
  confirmSuspendSub!: Subscription;
  confirmDeleteSub!: Subscription;
  constructor(
    private accountsEntityService: AccountsEntityService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private fb: UntypedFormBuilder
  ) {
    this.gradeKeys = Object.keys(this.grades).filter(Number);
    this.roleKeys = Object.keys(this.roles).filter(Number);
    this.filterValues = this.fb.group({
      grade: new UntypedFormControl(''),
      role: new UntypedFormControl(''),
      name: new UntypedFormControl(''),
      suspended: new UntypedFormControl(''),
    });
    this.loaded$ = this.accountsEntityService.loaded$;
  }
  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users$ = this.store.select(selectAccounts).pipe(
      map((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.customFilterPredicate();
        return users;
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onEditUser(user?: User) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '60%',
      minWidth: '500px',
      height: 'fit-content',
      minHeight: '400px',
      data: user
        ? { user: user, isNew: false, action: 'actualiza', isInGoogle: true }
        : { user: {}, isNew: true, action: 'crea', isInGoogle: false },
    });
    this.dialogSub = dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.isNew == false) {
          this.accountsEntityService.update(data.user);
        } else if (data.isNew == true) {
          this.accountsEntityService.add(data.user);
        }
      } else {
        console.log('Modal closed by the user');
      }
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id
      }`;
  }
  deleteMany(selection: SelectionModel<User>) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        action: 'elimina',
        subject: 'usuarios',
        confirm: false,
        title: `¿Está seguro de que desea eliminar ${selection.selected.length == 1 ? 'el' : 'los'
          } ${selection.selected.length} usuario${selection.selected.length == 1 ? '' : 's'
          } seleccionados?`,
        message:
          'Los usuarios seleccionados se eliminarán de la base de datos.',
      },
    });
    this.confirmDeleteSub = confirm.afterClosed().subscribe((data) => {
      if (data) {
        selection.selected.forEach((user) => {
          this.accountsEntityService.delete(user);
        });
        this.selection.clear();
      }
    });
  }
  suspendMany(selection: SelectionModel<User>) {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        action: 'suspender',
        subject: 'usuarios',
        confirm: false,
        title: `¿Está seguro de que desea suspender ${selection.selected.length == 1 ? 'el' : 'los'
          } ${selection.selected.length} usuario${selection.selected.length == 1 ? '' : 's'
          } seleccionados?`,
        message:
          'Los usuarios seleccionados se suspenderán de la base de datos.',
      },
    });
    this.confirmSuspendSub = confirm.afterClosed().subscribe((data) => {
      if (data) {
        selection.selected.forEach((user) => {
          const suspendedUser = { id: user.id, suspended: !user.suspended };
          this.accountsEntityService.update(suspendedUser);
        });
        this.selection.clear();
      }
    });
  }
  groupMany(selection: SelectionModel<User>) {
    let dialogRef: MatDialogRef<ChangeGradeComponent>;
    if (
      selection.selected
        .map((user) => user.role)
        .every((role) => role == 'alumnos')
    ) {
      const gradesArray = selection.selected.map((user) => user.grade);
      const levelArray = selection.selected.map((user) => user.level);
      const orgUnitPathArray = selection.selected.map(
        (user) => user.orgUnitPath
      );

      const grade = findMostFrequent(gradesArray);
      const level = findMostFrequent(levelArray);
      const orgUnitPath = findMostFrequent(orgUnitPathArray);
      dialogRef = this.dialog.open(ChangeGradeComponent, {
        data: {
          grade: grade.pop(),
          level: level.pop(),
          isInGoogle: false,
          action: 'Cambio de grupo',
          orgUnitPath: orgUnitPath.pop(),
        },
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          selection.selected.forEach((user) => {
            const updateddUser = {
              name: {
                givenName: user.name?.givenName,
                familyName: user.name?.familyName,
                fullName: user.name?.fullName,
              },
              id: user.id,
              grade: data.grade,
              level: data.level,
              orgUnitPath: data.orgUnitPath,
            };
            this.accountsEntityService.update(updateddUser);
          });
          this.selection.clear();
        }
      });
      this.reloadData();
    }
  }
  customFilterPredicate() {
    return (row: User, filter: string) => {
      const matchFilter = [];
      const filterArray = filter.split('$');
      const name =
        row.name?.fullName == null || row.name?.fullName === undefined
          ? ''
          : row.name.fullName;
      const grade =
        row.grade == null || row.grade === undefined ? '' : row.grade;
      const role = row.role == null || row.role === undefined ? '' : row.role;
      matchFilter.push(name.toLocaleLowerCase().includes(filterArray[0]));
      matchFilter.push(
        grade.toString().toLocaleLowerCase().includes(filterArray[1])
      );
      matchFilter.push(
        role.toString().toLocaleLowerCase().includes(filterArray[2])
      );
      return matchFilter.every(Boolean);
    };
  }

  applyFilter() {
    const name = this.filterValues.get('name')?.value;
    const grade = this.filterValues.get('grade')?.value;
    const role = this.filterValues.get('role')?.value;
    const suspended = this.filterValues.get('suspended')?.value;
    const nameFilter =
      name === undefined || name == null || name == '' ? '' : name;
    const gradeFilter =
      grade === undefined || grade == null || grade == ''
        ? ''
        : grade.toString();
    const roleFilter =
      role === undefined || role == null || role == '' ? '' : role.toString();
    const suspendedFilter =
      suspended === undefined || suspended == null || suspended == ''
        ? ''
        : suspended.toString();
    const filter = `${nameFilter}$${gradeFilter}$${roleFilter}$${suspended}`;
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy() { }
}
function findMostFrequent(arr: any[]) {
  return arr
    .reduce((acc, cur, ind, arr) => {
      if (arr.indexOf(cur) === ind) {
        return [...acc, [cur, 1]];
      } else {
        acc[acc.indexOf(acc.find((e: any[]) => e[0] === cur))] = [
          cur,
          acc[acc.indexOf(acc.find((e: any[]) => e[0] === cur))][1] + 1,
        ];
        return acc;
      }
    }, [])
    .sort((a: number[], b: number[]) => b[1] - a[1])
    .filter((cur: any[], ind: any, arr: any[][]) => cur[1] === arr[0][1])
    .map((cur: any[]) => cur[0]);
}

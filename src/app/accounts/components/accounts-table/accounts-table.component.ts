import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { ConfirmDialogComponent } from '@rds-shared/components';


import { ChangeGradeComponent, UserEditDialogComponent } from '..';
import { AccountsTableDataSource } from './accounts-table-data-source';
import { User } from '@rds-auth/models/user.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
})
export class AccountsTableComponent implements AfterViewInit {
  @Input() data!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: AccountsTableDataSource;
  selection = new SelectionModel<User>(true, []);
  columnsToDisplay = [
    {
      propertyName: 'givenName',
      headerText: 'Nombre(s)',
    },
    {
      propertyName: 'familyName',
      headerText: 'Apellido(s)',
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
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  constructor(
    private accountsEntityService: AccountsEntityService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.dataSource = new AccountsTableDataSource();
    this.dataSource.data = this.data;
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
    dialogRef.afterClosed().subscribe((data) => {
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
    confirm.afterClosed().subscribe((data) => {
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
    confirm.afterClosed().subscribe((data) => {
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
    }
  }
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

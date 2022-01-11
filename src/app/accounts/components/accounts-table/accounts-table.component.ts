import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@rds-shared/components';
import { ChangeGradeComponent, UserEditDialogComponent } from '..';
import { AccountsTableDataSource } from './accounts-table-data-source';
import { User } from '@rds-auth/models/user.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SchoolLevel, UserRole } from '@rds-auth/models/user.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@rds-store/app.state';
import { selectAccounts } from '@rds-accounts/state/accounts.selectors';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss'],
})
export class AccountsTableComponent implements OnInit, AfterViewInit {
  //@Input() data: User[];
  @ViewChild(MatTable) table: MatTable<User>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  count$: BehaviorSubject<number> = new BehaviorSubject(0);
  roleKeys: string[];
  roles = UserRole;
  gradeKeys: string[];
  grades = SchoolLevel;
  filterValues: FormGroup;
  filteredEntities$: Observable<User[]>;
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  /* ataSource: MatTableDataSource<User>; */
  selection = new SelectionModel<User>(true, []);
  subscription: Subscription;

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
    private _liveAnnouncer: LiveAnnouncer,
    private accountsEntityService: AccountsEntityService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {


  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.users$ = this.store.select(selectAccounts);
    this.gradeKeys = Object.keys(this.grades);
    this.roleKeys = Object.keys(this.roles);
    this.filterValues = this.fb.group({
      grade: new FormControl(),
      role: new FormControl(),
      name: new FormControl(),
      suspended: new FormControl(),
    });
    this.subscription = this.filterValues.valueChanges.subscribe((changes) => {
      Object.keys(changes).forEach(
        (key) => changes[key] == null && delete changes[key]
      );
      Object.keys(changes).includes('name') && changes.name !== ''
        ? (changes.name = { fullName: changes['name'] })
        : delete changes.name;
      return this.accountsEntityService.setFilter(changes);
    });



    this.filteredEntities$ = this.accountsEntityService.filteredEntities$.pipe(map(users => {
      //this.dataSource = new MatTableDataSource<User>(users);
      //this.dataSource.setData(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = users;

      this.count$.next(this.dataSource.data.length);
      return users;
    }));
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loaded$ = this.accountsEntityService.loaded$;
    this.loading$ = this.accountsEntityService.loading$;
  }

  ngAfterViewInit(): void {

    //this.table.dataSource = this.dataSource;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
        action: 'suspende',
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
        .every((role) => role == 'Alumnos')
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

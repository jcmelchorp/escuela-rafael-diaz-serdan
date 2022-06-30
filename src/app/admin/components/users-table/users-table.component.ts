import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { faBan, faExclamation, faTimes, faUserGraduate, faUserTie, faCheck, faScrewdriver, faArchive, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { AccountDomain } from '@rds-accounts/models/account-domain.model';



const { keys } = Object;
const SELECTED_SLICE_KEY = 'SELECTED_SLICE_KEY';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersTableComponent implements AfterViewInit, OnInit {
  @Input()
  data!: AccountDomain[] | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AccountDomain>;
  public dataSource!: MatTableDataSource<AccountDomain>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [/* 'id',  */'photo', 'name', 'primaryEmail', 'org', 'acciones'];
  expandedElement: any;
  public searchForm!: UntypedFormGroup;
  public creationTimeSearch = '';
  public courseName = '';
  select: any;
  faEdit = faEdit;
  faStudents = faUserGraduate;
  faTeachers = faUserTie;
  faExclamation = faExclamation;
  faCheck = faCheck;
  faFileArchive = faArchive;
  faScrewdriver = faScrewdriver;
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  faBan = faBan;
  searching = false;
  isExpansionDetailRow = (i: number, row: AccountDomain) => row.hasOwnProperty('detailRow');
  constructor() { }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data!);
    this.searchFormInit();
    //this.dataSource.filterPredicate = this.getFilterPredicate();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onDetails(row: AccountDomain) {
    console.log('details');
  }

  searchFormInit() {
    this.searchForm = new UntypedFormGroup({
      courseName: new UntypedFormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      creationTimeSearch: new UntypedFormControl(''),
    });
  }

  /* this method well be called for each row in table  */
  /* getFilterPredicate() {
    return (row: AccountsDomain, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const departureDate = filterArray[0];
      const usersName = filterArray[1];

      const matchFilter = [];

      // Fetch data from row
      const columnDepartureDate = new Date(row.creationTime).toLocaleDateString();
      const columnCourseWorkTitle = row.name;

      // verify fetching data by our searching values
      const customFilterDD = columnDepartureDate.toLowerCase().includes(departureDate);
      const customFilterCW = columnCourseWorkTitle.toLowerCase().includes(usersName);

      // push boolean values into array
      matchFilter.push(customFilterDD);
      matchFilter.push(customFilterCW);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  } */
  /* applyFilter() {
    const date = this.searchForm.get('creationTimeSearch').value;
    const as = this.searchForm.get('courseName').value;
    // const ds = this.searchForm.get('departureStation').value;
    const fixedDate = new Date(date);
    this.creationTimeSearch = (date === null || date === '') ? '' : fixedDate.toLocaleDateString();
    this.courseName = as === null ? '' : as;

    // create string of our searching values and split if by '$'
    const filterValue = this.creationTimeSearch + '$' + this.courseName;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 * /

  /*
    unavailableSeats(seats: Seat[]): number {
      return seats.filter(seat => seat.status === SeatStatus.UNAVAILABLE).length;
    }

    soldSeats(seats: Seat[]): number {
      return seats.filter(seat => seat.status === SeatStatus.SOLD).length;
    }

    reserveSeats(seats: Seat[]): number {
      return seats.filter(seat => seat.status === SeatStatus.RESERVE).length;
    } */

}

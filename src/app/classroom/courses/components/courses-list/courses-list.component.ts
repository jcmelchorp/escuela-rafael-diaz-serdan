import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { faEdit, faUserGraduate, faUserTie, faExclamation, faCheck, faArchive, faScrewdriver, faTimes, faUserPlus, faBan, faPlus, faBullhorn } from '@fortawesome/free-solid-svg-icons';

import { CourseEntityService } from '@rds-root/app/store/classroom/course/course-entity.service';

import { CourseState } from '@rds-classroom/models/classroom.enum';

import { filter } from 'rxjs/operators';
import { concat, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CoursesListComponent implements OnInit, AfterViewInit {
  courses: gapi.client.classroom.Course[];
  isLoading$: Observable<boolean>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<gapi.client.classroom.Course>;
  public displayedColumns: string[] = ['courseState', 'name', 'section', 'room'];
  public dataSource: MatTableDataSource<gapi.client.classroom.Course>;
  public courseTotal$: Observable<number>;
  public filterSubject = new Subject<string>();
  public defaultSort: Sort = { active: 'name', direction: 'asc' };
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
  faPlus = faPlus;
  faBullhorn = faBullhorn;
  searching: boolean = false;
  searchForm: FormGroup;
  name: FormControl;
  creationTime: FormControl;
  public creationTimeFilter = '';
  public courseNameFilter = '';
  public courseStateFilter = [''];
  keys;
  states = CourseState;
  selectedStates: string[];

  constructor(
    private courseEntityService: CourseEntityService,
    private fb: FormBuilder
  ) {
    this.keys = Object.keys(this.states).filter(Number);
    this.courseTotal$ = this.courseEntityService.count$
    this.courseEntityService.entities$.subscribe(courses => this.courses = courses);
  }
  ngOnInit(): void {
    this.searchFormInit();
    this.selectedStates = ['ACTIVE', 'ARCHIVED', 'PROVISIONED', 'DECLINED', 'SUSPENDED']
    this.dataSource = new MatTableDataSource(this.courses);
    this.dataSource.filterPredicate = this.getFilterPredicate();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  searchFormInit(): void {
    this.searchForm = this.fb.group({
      name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      creationTime: new FormControl(''),
      //selectedStates: new FormControl()
    });
  }

  /* this method well be called for each row in table  */
  getFilterPredicate() {
    return (row: gapi.client.classroom.Course, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const creationDate = filterArray[0];
      const coursesName = filterArray[1];
      //const courseStates = filterArray[2];
      const matchFilter = [];
      // Fetch data from row
      const columnCreationDate = new Date(row.creationTime).toLocaleDateString();
      const columnCourseTitle = row.name;
      //const columnCourseState = row.courseState;
      // verify fetching data by our searching values
      const customFilterDD = columnCreationDate.toLowerCase().includes(creationDate);
      const customFilterCW = columnCourseTitle.toLowerCase().includes(coursesName);
      //const customFilterCS = columnCourseState.toLowerCase().includes(courseStates);

      // push boolean values into array
      matchFilter.push(customFilterDD);
      matchFilter.push(customFilterCW);
      //matchFilter.push(customFilterCS);
      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }
  applyFilter() {
    const date = this.searchForm.get('creationTime').value;
    const as = this.searchForm.get('name').value;
    // const st: string[] = this.searchForm.get('selectedStates').value;
    const fixedDate = new Date(date);
    this.creationTimeFilter = (date === null || date === '') ? '' : fixedDate.toLocaleDateString();
    this.courseNameFilter = as === null ? '' : as;
    // create string of our searching values and split if by '$'
    const filterValue = this.creationTimeFilter + '$' + this.courseNameFilter;
    const value = filterValue.trim().toLowerCase();
    this.dataSource.filter = value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  tableFilter() {
    const filterFunction = (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);

      // return all data if there are no filter values
      if (!searchTerms.SubValue.length && !searchTerms.Horizontal.length && !searchTerms.ID.length) {
        return true;
      }

      return (
        searchTerms.SubValue.indexOf(data.SubValue) !== -1 ||
        searchTerms.Horizontal.indexOf(data.Horizontal) !== -1 ||
        searchTerms.ID.indexOf(data.ID) !== -1
      );
    };
    return filterFunction;
  }
  //this.loadCourses();
  /* let filter$ = this.filterSubject.pipe(
    debounceTime(150),
    distinctUntilChanged(),
    tap((value: string) => {
      this.paginator.pageIndex = 0;
      this.filter = value;
    })
  ); */

  //let sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));

  /*  this.subscription.add(merge(filter$, sort$, this.paginator.page).pipe(
     tap(() => this.loadCourses())
   ).subscribe()); */


  /*  private loadCourses(): void {
     this.store.dispatch(loadCourses({
       params: {

        pageSize: this.paginator.pageSize,

        coursesState
       filter: this.filter.toLocaleLowerCase(),
       pageIndex: this.paginator.pageIndex,
       ,

       }
     }));


   }
  */


  /* public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } */

  /*  public retry(): void {
     this.loadCourses();
   } */

}

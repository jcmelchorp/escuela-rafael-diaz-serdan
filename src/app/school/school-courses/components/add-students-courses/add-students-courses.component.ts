import { tap } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@rds-auth/models/user.model';
import { AssignedCourse } from '@rds-school/school-courses/models/school-course.model';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { Observable } from 'rxjs';
import { StudentsCourses } from '../../models/students-courses.model';

@Component({
  templateUrl: './add-students-courses.component.html',
  styleUrls: ['./add-students-courses.component.scss']
})
export class AddStudentsCoursesComponent implements OnInit {
  @ViewChild('studentInput') studentInput: ElementRef<HTMLInputElement>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  users: User[];
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  findCtrl = new FormControl();
  filteredStudents: Observable<User[]>;
  filterValues: FormGroup;
  filteredEntities$: Observable<User[]>;
  studentsCourses: StudentsCourses;
  studentsStr: string[] = [];
  students: User[] = [];
  constructor(
    private fb: FormBuilder,
    private accountsEntityService: AccountsEntityService,
    private dialogRef: MatDialogRef<AddStudentsCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loaded$ = this.accountsEntityService.loaded$;
    this.loading$ = this.accountsEntityService.loading$;
    this.filterValues = this.fb.group({
      fullName: new FormControl(),
    });
    this.filterValues.valueChanges.subscribe((changes) => {
      Object.keys(changes).forEach(
        (key) => changes[key] == null && delete changes[key]
      );
      Object.keys(changes).includes('fullName') && changes.name !== ''
        ? (changes.name = { fullName: changes['fullName'] })
        : delete changes.name;
      return this.accountsEntityService.setFilter(changes);
    });
    this.users$ = this.accountsEntityService.entities$.pipe(
      tap(users => this.users = users),
      tap(users =>
        this.data.course.studentsIds?.forEach(s => {
          this.studentsStr.push(s);
          this.students.push(users.find(u => u.id === s));
        }))
    );
    this.filteredEntities$ = this.accountsEntityService.filteredEntities$;
  }
  ngOnInit(): void {

  }

  applyFilterString() {
    const nameForm = this.filterValues.get('fullName')?.value;
    const displayName =
      nameForm === undefined || nameForm == null || nameForm == ''
        ? ''
        : nameForm;
    const primaryEmail =
      nameForm === undefined || nameForm == null || nameForm == ''
        ? ''
        : nameForm;
    const role =
      nameForm === undefined || nameForm == null || nameForm == ''
        ? ''
        : nameForm;
    const filter = JSON.parse(
      JSON.stringify({ displayName, primaryEmail, role })
    );
  }
  async add(event: MatChipInputEvent): Promise<void> {
    if (this.studentsStr.includes(event.value)) {
      const value = (event.value || '').trim();
      // Add our fruit
      if (value) {
        this.students.push(this.users.find(u => u.id === event.value));
        this.studentsStr.push(value);
      }

    }
    // Clear the input value
    event.chipInput!.clear();

    this.filterValues.controls['fullName'].setValue(null);
  }

  remove(id: string): void {
    const index = this.studentsStr.indexOf(id);
    const index2 = this.students.indexOf(this.students.find(u => u.id === id));
    if (index >= 0) {
      this.studentsStr.splice(index, 1);
      this.students.splice(index2, 1);
    }
  }
  focusFruitInput() {
    this.studentInput.nativeElement.blur();
    this.studentInput.nativeElement.focus();
  }
  async selected(event: MatAutocompleteSelectedEvent): Promise<void> {
    let student: User;
    this.users$.subscribe(users => student = users.find(u => u.id === event.option.value));
    this.students.push(student);
    this.studentsStr.push(event.option.value);
    this.studentInput.nativeElement.value = '';
    this.filterValues.controls['fullName'].setValue(null);
  }
  saveData() {
    const course: Partial<AssignedCourse> = {
      ...this.data.course,
      students: this.studentsStr,
    };
    //!this.data.isNew ? course.id = this.data.course.id : null;
    this.dialogRef.close({
      course: course,
    });
  }
  close() {
    this.dialogRef.close();
  }

}

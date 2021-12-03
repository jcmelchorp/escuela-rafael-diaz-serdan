import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsCoursesComponent } from './add-students-courses.component';

describe('AddStudentsCoursesComponent', () => {
  let component: AddStudentsCoursesComponent;
  let fixture: ComponentFixture<AddStudentsCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

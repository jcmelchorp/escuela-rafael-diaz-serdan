import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentCourseDialogComponent } from './enrollment-course-dialog.component';

describe('EnrollmentCourseDialogComponent', () => {
  let component: EnrollmentCourseDialogComponent;
  let fixture: ComponentFixture<EnrollmentCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentCourseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

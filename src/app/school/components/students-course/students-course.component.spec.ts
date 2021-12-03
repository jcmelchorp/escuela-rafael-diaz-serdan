import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCourseComponent } from './students-course.component';

describe('StudentsCourseComponent', () => {
  let component: StudentsCourseComponent;
  let fixture: ComponentFixture<StudentsCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

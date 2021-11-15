import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCoursesComponent } from './school-courses.component';

describe('SchoolCoursesComponent', () => {
  let component: SchoolCoursesComponent;
  let fixture: ComponentFixture<SchoolCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCoursesDialogComponent } from './school-courses-dialog.component';

describe('SchoolCoursesDialogComponent', () => {
  let component: SchoolCoursesDialogComponent;
  let fixture: ComponentFixture<SchoolCoursesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCoursesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

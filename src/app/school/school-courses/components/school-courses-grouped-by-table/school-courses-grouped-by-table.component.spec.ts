import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCoursesGroupedByTableComponent } from './school-courses-grouped-by-table.component';

describe('SchoolCoursesGroupedByTableComponent', () => {
  let component: SchoolCoursesGroupedByTableComponent;
  let fixture: ComponentFixture<SchoolCoursesGroupedByTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCoursesGroupedByTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCoursesGroupedByTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

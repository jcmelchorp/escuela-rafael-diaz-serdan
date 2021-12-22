import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassroomDialogComponent } from './school-classroom-dialog.component';

describe('SchoolClassroomDialogComponent', () => {
  let component: SchoolClassroomDialogComponent;
  let fixture: ComponentFixture<SchoolClassroomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassroomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

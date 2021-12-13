import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassroomGroupListComponent } from './school-classroom-group-list.component';

describe('SchoolClassroomGroupListComponent', () => {
  let component: SchoolClassroomGroupListComponent;
  let fixture: ComponentFixture<SchoolClassroomGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassroomGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassroomGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

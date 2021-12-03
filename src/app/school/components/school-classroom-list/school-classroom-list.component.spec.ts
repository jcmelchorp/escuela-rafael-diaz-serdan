import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassroomListComponent } from './school-classroom-list.component';

describe('SchoolClassroomListComponent', () => {
  let component: SchoolClassroomListComponent;
  let fixture: ComponentFixture<SchoolClassroomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassroomListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassroomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassroomDetailsComponent } from './school-classroom-details.component';

describe('SchoolClassroomDetailsComponent', () => {
  let component: SchoolClassroomDetailsComponent;
  let fixture: ComponentFixture<SchoolClassroomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassroomDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassroomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

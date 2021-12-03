import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassroomsComponent } from './school-classrooms.component';

describe('SchoolClassroomsComponent', () => {
  let component: SchoolClassroomsComponent;
  let fixture: ComponentFixture<SchoolClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

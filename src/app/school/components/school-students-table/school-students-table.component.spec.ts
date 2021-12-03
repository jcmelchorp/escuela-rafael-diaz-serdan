import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStudentsTableComponent } from './school-students-table.component';

describe('SchoolStudentsComponent', () => {
  let component: SchoolStudentsTableComponent;
  let fixture: ComponentFixture<SchoolStudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolStudentsTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

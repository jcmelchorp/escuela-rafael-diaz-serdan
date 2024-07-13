import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersGradeComponent } from './teachers-grade.component';

describe('TeachersGradeComponent', () => {
  let component: TeachersGradeComponent;
  let fixture: ComponentFixture<TeachersGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

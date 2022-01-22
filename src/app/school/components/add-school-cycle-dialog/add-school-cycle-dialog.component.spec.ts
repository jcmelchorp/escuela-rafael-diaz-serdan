import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolCycleDialogComponent } from './add-school-cycle-dialog.component';

describe('AddSchoolCycleDialogComponent', () => {
  let component: AddSchoolCycleDialogComponent;
  let fixture: ComponentFixture<AddSchoolCycleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchoolCycleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchoolCycleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

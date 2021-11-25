import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCycleDialogComponent } from './select-cycle-dialog.component';

describe('SelectCycleDialogComponent', () => {
  let component: SelectCycleDialogComponent;
  let fixture: ComponentFixture<SelectCycleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCycleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCycleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

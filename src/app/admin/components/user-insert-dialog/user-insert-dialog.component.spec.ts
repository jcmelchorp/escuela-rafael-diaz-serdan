import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInsertDialogComponent } from './user-insert-dialog.component';

describe('UserInsertDialogComponent', () => {
  let component: UserInsertDialogComponent;
  let fixture: ComponentFixture<UserInsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInsertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

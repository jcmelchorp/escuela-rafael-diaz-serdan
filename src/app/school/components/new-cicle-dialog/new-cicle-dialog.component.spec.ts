import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCicleDialogComponent } from './new-cicle-dialog.component';

describe('NewCicleDialogComponent', () => {
  let component: NewCicleDialogComponent;
  let fixture: ComponentFixture<NewCicleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCicleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

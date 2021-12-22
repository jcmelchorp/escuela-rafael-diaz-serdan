import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolActionButtonsComponent } from './school-action-buttons.component';

describe('SchoolActionButtonsComponent', () => {
  let component: SchoolActionButtonsComponent;
  let fixture: ComponentFixture<SchoolActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolActionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

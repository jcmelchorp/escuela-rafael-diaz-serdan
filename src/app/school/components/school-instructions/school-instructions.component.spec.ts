import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInstructionsComponent } from './school-instructions.component';

describe('SchoolInstructionsComponent', () => {
  let component: SchoolInstructionsComponent;
  let fixture: ComponentFixture<SchoolInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

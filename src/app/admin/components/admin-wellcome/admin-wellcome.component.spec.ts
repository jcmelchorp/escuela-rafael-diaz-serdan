import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWellcomeComponent } from './admin-wellcome.component';

describe('AdminWellcomeComponent', () => {
  let component: AdminWellcomeComponent;
  let fixture: ComponentFixture<AdminWellcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWellcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWellcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

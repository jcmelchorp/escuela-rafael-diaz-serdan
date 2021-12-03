import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationProgressComponent } from './migration-progress.component';

describe('MigrationProgressComponent', () => {
  let component: MigrationProgressComponent;
  let fixture: ComponentFixture<MigrationProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrationProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiaAlertComponent } from './fia-alert.component';

describe('FiaAlertComponent', () => {
  let component: FiaAlertComponent;
  let fixture: ComponentFixture<FiaAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiaAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiaAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

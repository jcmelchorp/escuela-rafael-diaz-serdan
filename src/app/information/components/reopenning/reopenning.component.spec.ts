import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenningComponent } from './reopenning.component';

describe('ReopenningComponent', () => {
  let component: ReopenningComponent;
  let fixture: ComponentFixture<ReopenningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReopenningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

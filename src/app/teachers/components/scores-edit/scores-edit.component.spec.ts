import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresEditComponent } from './scores-edit.component';

describe('ScoresEditComponent', () => {
  let component: ScoresEditComponent;
  let fixture: ComponentFixture<ScoresEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

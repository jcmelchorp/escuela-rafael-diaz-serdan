import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileScoresTableComponent } from './profile-scores-table.component';

describe('ProfileScoresTableComponent', () => {
  let component: ProfileScoresTableComponent;
  let fixture: ComponentFixture<ProfileScoresTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileScoresTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileScoresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

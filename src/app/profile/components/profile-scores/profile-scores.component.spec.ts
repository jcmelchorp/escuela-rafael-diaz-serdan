import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileScoresComponent } from './profile-scores.component';

describe('ProfileScoresComponent', () => {
  let component: ProfileScoresComponent;
  let fixture: ComponentFixture<ProfileScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileScoresListComponent } from './profile-scores-list.component';

describe('ProfileScoresListComponent', () => {
  let component: ProfileScoresListComponent;
  let fixture: ComponentFixture<ProfileScoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileScoresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileScoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

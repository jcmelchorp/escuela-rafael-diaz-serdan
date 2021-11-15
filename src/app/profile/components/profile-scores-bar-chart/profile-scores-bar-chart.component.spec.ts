import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileScoresBarChartComponent } from './profile-scores-bar-chart.component';

describe('ProfileScoresBarChartComponent', () => {
  let component: ProfileScoresBarChartComponent;
  let fixture: ComponentFixture<ProfileScoresBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileScoresBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileScoresBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxSpaceComponent } from './parallax-space.component';

describe('ParallaxSpaceComponent', () => {
  let component: ParallaxSpaceComponent;
  let fixture: ComponentFixture<ParallaxSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParallaxSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

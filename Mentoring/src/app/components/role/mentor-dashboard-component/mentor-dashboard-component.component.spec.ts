import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDashboardComponentComponent } from './mentor-dashboard-component.component';

describe('MentorDashboardComponentComponent', () => {
  let component: MentorDashboardComponentComponent;
  let fixture: ComponentFixture<MentorDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorDashboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

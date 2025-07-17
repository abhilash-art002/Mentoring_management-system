import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodDashboardComponentComponent } from './hod-dashboard-component.component';

describe('HodDashboardComponentComponent', () => {
  let component: HodDashboardComponentComponent;
  let fixture: ComponentFixture<HodDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodDashboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

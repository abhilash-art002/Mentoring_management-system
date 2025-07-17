import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodStudentManagerComponent } from './hod-student-manager.component';

describe('HodStudentManagerComponent', () => {
  let component: HodStudentManagerComponent;
  let fixture: ComponentFixture<HodStudentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodStudentManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodStudentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

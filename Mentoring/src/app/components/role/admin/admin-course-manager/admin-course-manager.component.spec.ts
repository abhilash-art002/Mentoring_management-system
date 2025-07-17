import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseManagerComponent } from './admin-course-manager.component';

describe('AdminCourseManagerComponent', () => {
  let component: AdminCourseManagerComponent;
  let fixture: ComponentFixture<AdminCourseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCourseManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

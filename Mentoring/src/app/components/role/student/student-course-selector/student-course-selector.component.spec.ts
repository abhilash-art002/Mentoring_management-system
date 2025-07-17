import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseSelectorComponent } from './student-course-selector.component';

describe('StudentCourseSelectorComponent', () => {
  let component: StudentCourseSelectorComponent;
  let fixture: ComponentFixture<StudentCourseSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCourseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

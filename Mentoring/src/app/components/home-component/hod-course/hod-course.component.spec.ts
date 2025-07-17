import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodCourseComponent } from './hod-course.component';

describe('HodCourseComponent', () => {
  let component: HodCourseComponent;
  let fixture: ComponentFixture<HodCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

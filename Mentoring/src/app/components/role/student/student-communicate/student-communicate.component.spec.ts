import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCommunicateComponent } from './student-communicate.component';

describe('StudentCommunicateComponent', () => {
  let component: StudentCommunicateComponent;
  let fixture: ComponentFixture<StudentCommunicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCommunicateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCommunicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

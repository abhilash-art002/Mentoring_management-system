import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHierarchyComponent } from './user-hierarchy.component';

describe('UserHierarchyComponent', () => {
  let component: UserHierarchyComponent;
  let fixture: ComponentFixture<UserHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHierarchyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

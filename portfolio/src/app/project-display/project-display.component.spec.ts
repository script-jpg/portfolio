import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDisplayComponent } from './project-display.component';

describe('ProjectDisplayComponent', () => {
  let component: ProjectDisplayComponent;
  let fixture: ComponentFixture<ProjectDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDisplayComponent]
    });
    fixture = TestBed.createComponent(ProjectDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

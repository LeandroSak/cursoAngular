import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersDialogComponent } from './teachers-dialog.component';

describe('TeachersDialogComponent', () => {
  let component: TeachersDialogComponent;
  let fixture: ComponentFixture<TeachersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersDialogComponent]
    });
    fixture = TestBed.createComponent(TeachersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

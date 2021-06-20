import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditorComponent } from './emp-editor.component';

describe('EmpEditorComponent', () => {
  let component: EmpEditorComponent;
  let fixture: ComponentFixture<EmpEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

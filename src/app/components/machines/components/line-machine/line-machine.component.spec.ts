import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMachineComponent } from './line-machine.component';

describe('LineMachineComponent', () => {
  let component: LineMachineComponent;
  let fixture: ComponentFixture<LineMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

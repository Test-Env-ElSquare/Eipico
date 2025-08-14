import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineStateComponent } from './machine-state.component';

describe('MachineStateComponent', () => {
  let component: MachineStateComponent;
  let fixture: ComponentFixture<MachineStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

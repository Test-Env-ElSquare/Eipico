import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineStateDetailsComponent } from './machine-state-details.component';

describe('MachineStateDetailsComponent', () => {
  let component: MachineStateDetailsComponent;
  let fixture: ComponentFixture<MachineStateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineStateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineStateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

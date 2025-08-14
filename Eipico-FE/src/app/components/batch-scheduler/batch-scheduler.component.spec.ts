import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSchedulerComponent } from './batch-scheduler.component';

describe('BatchSchedulerComponent', () => {
  let component: BatchSchedulerComponent;
  let fixture: ComponentFixture<BatchSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

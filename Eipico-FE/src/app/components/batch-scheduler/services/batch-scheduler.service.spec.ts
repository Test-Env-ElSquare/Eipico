import { TestBed } from '@angular/core/testing';

import { BatchSchedulerService } from './batch-scheduler.service';

describe('BatchSchedulerService', () => {
  let service: BatchSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

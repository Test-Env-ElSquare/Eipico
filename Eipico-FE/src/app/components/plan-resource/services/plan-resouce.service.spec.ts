import { TestBed } from '@angular/core/testing';

import { PlanResouceService } from './plan-resouce.service';

describe('PlanResouceService', () => {
  let service: PlanResouceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanResouceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

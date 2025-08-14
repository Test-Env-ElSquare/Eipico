import { TestBed } from '@angular/core/testing';

import { PlanProductService } from './plan-product.service';

describe('PlanProductService', () => {
  let service: PlanProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

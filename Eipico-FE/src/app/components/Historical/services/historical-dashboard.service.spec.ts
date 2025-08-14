import { TestBed } from '@angular/core/testing';

import { HistoricalDashboardService } from './historical-dashboard.service';

describe('HistoricalDashboardService', () => {
  let service: HistoricalDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricalDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SignalREnergyService } from './signal-r-energy.service';

describe('SignalREnergyService', () => {
  let service: SignalREnergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalREnergyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

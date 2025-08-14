import { TestBed } from '@angular/core/testing';

import { ScadaService } from './scada.service';

describe('ScadaService', () => {
  let service: ScadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

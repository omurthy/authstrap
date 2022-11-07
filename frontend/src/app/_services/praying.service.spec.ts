import { TestBed } from '@angular/core/testing';

import { PrayingService } from './praying.service';

describe('PrayingService', () => {
  let service: PrayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

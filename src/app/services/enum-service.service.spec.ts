import { TestBed } from '@angular/core/testing';

import { EnumServiceService } from './enum-service.service';

describe('EnumServiceService', () => {
  let service: EnumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

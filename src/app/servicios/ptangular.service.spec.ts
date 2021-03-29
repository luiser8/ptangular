import { TestBed } from '@angular/core/testing';

import { PtangularService } from './ptangular.service';

describe('PtangularService', () => {
  let service: PtangularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PtangularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

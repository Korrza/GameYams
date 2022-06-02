import { TestBed } from '@angular/core/testing';

import { GettingDBService } from './getting-db.service';

describe('GettingDBService', () => {
  let service: GettingDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettingDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { ClassService } from './class.service';

describe('ClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassService]
    });
  });

  it('should be created', inject([ClassService], (service: ClassService) => {
    expect(service).toBeTruthy();
  }));
});

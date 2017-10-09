import { TestBed, inject } from '@angular/core/testing';

import { DeckService } from './deck.service';

describe('DeckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeckService]
    });
  });

  it('should be created', inject([DeckService], (service: DeckService) => {
    expect(service).toBeTruthy();
  }));
});

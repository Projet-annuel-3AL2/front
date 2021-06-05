import { TestBed } from '@angular/core/testing';

import { ConversationBoxService } from './conversation-box.service';

describe('ConversationBoxService', () => {
  let service: ConversationBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

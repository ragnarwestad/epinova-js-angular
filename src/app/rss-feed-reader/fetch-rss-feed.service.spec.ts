import { TestBed } from '@angular/core/testing';

import { FetchRssFeedService } from './fetch-rss-feed.service';
import { HttpClientModule } from '@angular/common/http';
import { RssFeedReaderComponent } from './rss-feed-reader.component';

describe('FetchRssFeedService', () => {
  let service: FetchRssFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RssFeedReaderComponent]
    });
    service = TestBed.inject(FetchRssFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as xml2js from 'xml2js';

export interface RssFeedItem {
  title?: string[];
  description?: string[];
}

export interface RssFeedChannel {
  item: RssFeedItem[];
}

export interface RssFeedData {
  rss: {
    channel: RssFeedChannel[];
  };
}


@Injectable({
  providedIn: 'root',
})
export class FetchRssFeedService {
  constructor(private http: HttpClient) {}

  fetchRssFeed(url: string): Observable<RssFeedData> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response) => {
        let rssData: any;
        xml2js.parseString(response, { trim: true }, (err, result) => {
          if (err) {
            throw new Error('Error parsing RSS feed');
          }
          rssData = result;
        });
        return rssData;
      })
    );
  }
}

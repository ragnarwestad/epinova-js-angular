// src/app/rss-feed-reader/rss-feed-reader.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseString } from 'xml2js';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';

interface RssFeedItem {
  title?: string[];
  description?: string[];
}

interface RssFeedChannel {
  item: RssFeedItem[];
}

interface RssFeedData {
  rss: {
    channel: RssFeedChannel[];
  };
}

@Component({
  selector: 'app-rss-feed-reader',
  templateUrl: './rss-feed-reader.component.html',
  styleUrls: ['./rss-feed-reader.component.css'],
  standalone: true,
  imports: [NgIf, NgForOf, SlicePipe]
})
export class RssFeedReaderComponent implements OnInit {
  @Input() rssFeedUrl!: string;
  rssFeedData: RssFeedData | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRssFeed();
  }

  fetchRssFeed() {
    this.http.get(this.rssFeedUrl, { responseType: 'text' }).subscribe(data => {
      parseString(data, (err, result) => {
        if (err) {
          console.error('Error parsing RSS feed:', err);
        } else {
          this.rssFeedData = result;
        }
      });
    });
  }
}

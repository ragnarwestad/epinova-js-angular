import { Component, Input, OnInit } from '@angular/core';
import { FetchRssFeedService, RssFeedData } from './fetch-rss-feed.service';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-rss-feed-reader',
  templateUrl: './rss-feed-reader.component.html',
  styleUrls: ['./rss-feed-reader.component.css'],
  imports: [
    NgForOf,
    NgIf,
    SlicePipe,
  ],
  standalone: true
})
export class RssFeedReaderComponent implements OnInit {
  @Input() rssFeedUrl!: string;
  rssFeedData: RssFeedData | null = null;

  constructor(private fetchRssFeedService: FetchRssFeedService) {}

  ngOnInit() {
    this.fetchRssFeedService.fetchRssFeed(this.rssFeedUrl).subscribe(
      (data: RssFeedData) => {
        this.rssFeedData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

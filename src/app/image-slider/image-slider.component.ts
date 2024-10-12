import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { parseString } from 'xml2js';

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
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  imports: [
    MatButton,
    NgIf,
    NgForOf,
    HttpClientModule,
    SlicePipe,
    // Add HttpClientModule here if it's a standalone component
  ],
  standalone: true
})
export class ImageSliderComponent implements OnInit {

  images: string[] = [
    'assets/en-gruppe-i-et-mote.jpg',
  ];
  currentIndex: number = 0;
  location: string = '';
  rssFeedUrl: string = '/api/public/shows/the-report';
  rssFeedData: RssFeedData | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLocation();
    this.fetchRssFeed();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length + 1;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex < this.images.length + 1) ? this.currentIndex + 1 : 0;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        console.log(this.location); // Log the location to verify
      });
    } else {
      this.location = 'Geolocation is not supported by this browser.';
    }
  }

  fetchRssFeed() {
    this.http.get(this.rssFeedUrl, { responseType: 'text' }).subscribe(data => {
      parseString(data, (err, result) => {
        if (err) {
          console.error('Error parsing RSS feed:', err);
        } else {
          this.rssFeedData = result;
          console.log(this.rssFeedData); // Log the RSS feed data to verify
        }
      });
    });
  }
}

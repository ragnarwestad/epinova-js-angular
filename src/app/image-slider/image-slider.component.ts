// src/app/image-slider/image-slider.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { YouTubePlayerComponent } from '../youtube-player/youtube-player.component';
import { RssFeedReaderComponent } from '../rss-feed-reader/rss-feed-reader.component';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  imports: [
    NgIf,
    HttpClientModule,
    MatButton,
    YouTubePlayerComponent,
    RssFeedReaderComponent
  ],
  standalone: true
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;
  location: string = '';
  rssFeedUrl: string = '/api/public/shows/the-report';
  videoId = 'M7lc1UVf-VE';
  isDesktopView: boolean = window.innerWidth >= 768;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLocation();
  }

  ngOnDestroy() {
    // Clean up if necessary
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktopView = event.target.innerWidth >= 768;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : 2;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex < 2) ? this.currentIndex + 1 : 0;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
      });
    } else {
      this.location = 'Geolocation is not supported by this browser.';
    }
  }
}

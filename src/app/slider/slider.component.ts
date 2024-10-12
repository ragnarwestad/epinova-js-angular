import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { YouTubePlayerComponent } from '../youtube-player/youtube-player.component';
import { RssFeedReaderComponent } from '../rss-feed-reader/rss-feed-reader.component';
import { LocationDisplayComponent } from '../location-display/location-display.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  imports: [
    NgIf,
    HttpClientModule,
    MatButton,
    YouTubePlayerComponent,
    RssFeedReaderComponent,
    LocationDisplayComponent
  ],
  standalone: true
})
export class SliderComponent implements OnInit {
  currentIndex: number = 0;
  rssFeedUrl: string = '/api/public/shows/the-report';
  videoId = 'M7lc1UVf-VE';
  isDesktopView: boolean = window.innerWidth >= 768;

  ngOnInit() {}

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
}

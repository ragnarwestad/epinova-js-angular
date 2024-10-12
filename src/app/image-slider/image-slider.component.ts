import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { parseString } from 'xml2js';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

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
    NgIf,
    NgForOf,
    SlicePipe,
    HttpClientModule,
    MatButton
  ],
  standalone: true
})
export class ImageSliderComponent implements AfterViewInit, OnInit, OnDestroy {
  images: string[] = ['assets/en-gruppe-i-et-mote.jpg'];
  currentIndex: number = 0;
  location: string = '';
  rssFeedUrl: string = '/api/public/shows/the-report';
  rssFeedData: RssFeedData | null = null;
  videoId = 'M7lc1UVf-VE';

  @ViewChild('playerContainer', { static: false }) playerContainer!: ElementRef;
  player!: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLocation();
    this.fetchRssFeed();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  }

  ngAfterViewInit() {
    if (!window.YT) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(scriptTag);
      console.log('YouTube API script added to the DOM');
    }

    this.waitForYouTubeAPI();
  }

  waitForYouTubeAPI() {
    if (window.YT && window.YT.Player && this.playerContainer) {
      this.initPlayer();
    } else {
      setTimeout(() => this.waitForYouTubeAPI(), 100);
    }
  }

  initPlayer() {
    console.log('Initializing YouTube Player');
    this.player = new window.YT.Player(this.playerContainer.nativeElement, {
      videoId: this.videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onError: this.onPlayerError.bind(this),
      },
    });
  }

  onPlayerError(event: any) {
    console.error('YouTube Player error:', event);
  }

  onPlayerReady(event: any) {
    if (this.currentIndex === this.images.length + 2) {
      event.target.playVideo();
    }
  }

  prevImage() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length + 2;
    this.handleSlideChange();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex < this.images.length + 2) ? this.currentIndex + 1 : 0;
    this.handleSlideChange();
  }

  handleSlideChange() {
    if (this.currentIndex === this.images.length + 2 && this.player) {
      this.player.playVideo();
    } else if (this.player) {
      this.player.pauseVideo();
    }
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

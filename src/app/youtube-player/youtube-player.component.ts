import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css'],
  standalone: true,
  imports: [HttpClientModule, NgIf]
})
export class YouTubePlayerComponent implements AfterViewInit, OnDestroy {
  @Input() videoId!: string;
  @ViewChild('playerContainer', { static: false }) playerContainer!: ElementRef;
  player!: any;
  videoTitle: string | undefined;
  viewCount: string | undefined;
  likeCount: string | undefined;
  commentCount: string | undefined;
  youTubeError: boolean = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    if (!window.YT) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(scriptTag);
    }

    this.waitForYouTubeAPI();
    this.fetchVideoMetadata();
    this.updatePlayerSize();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
    window.removeEventListener('resize', this.updatePlayerSize);
  }

  waitForYouTubeAPI() {
    if (window.YT && window.YT.Player && this.playerContainer) {
      this.initPlayer();
    } else {
      setTimeout(() => this.waitForYouTubeAPI(), 100);
    }
  }

  initPlayer() {
    this.player = new window.YT.Player(this.playerContainer.nativeElement, {
      videoId: this.videoId,
      height: this.calculatePlayerHeight(),
      width: this.calculatePlayerWidth(),
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event: any) => {
          console.log('YouTube Player is ready:', event);
        },
        onError: (event: any) => {
          console.error('YouTube Player error:', event);
        },
      },
    });
    window.addEventListener('resize', this.updatePlayerSize.bind(this));
  }

  fetchVideoMetadata() {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&part=snippet,statistics&key=${apiKey}`;

    this.http.get(url).subscribe(
      (response: any) => {
        if (response.items && response.items.length > 0) {
          const videoData = response.items[0];
          this.videoTitle = videoData.snippet.title;
          this.viewCount = videoData.statistics.viewCount;
          this.likeCount = videoData.statistics.likeCount;
          this.commentCount = videoData.statistics.commentCount;
        }
      },
      (error: any) => {
        console.error('YouTube API error:', error);
        this.youTubeError = true;
      }
    );
  }

  calculatePlayerWidth() {
    return window.innerWidth * 0.65;
  }

  calculatePlayerHeight() {
    return window.innerHeight * 0.65;
  }

  updatePlayerSize() {
    if (this.player) {
      const width = this.calculatePlayerWidth();
      const height = this.calculatePlayerHeight();
      this.player.setSize(width, height);
    }
  }
}

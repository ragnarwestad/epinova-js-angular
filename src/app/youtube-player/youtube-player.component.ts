import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  imports: [CommonModule]
})
export class YouTubePlayerComponent implements AfterViewInit, OnDestroy {
  @Input() videoId!: string;
  @ViewChild('playerContainer', { static: false }) playerContainer!: ElementRef;
  player!: any;
  videoTitle: string | undefined;
  viewCount: string | undefined;
  likeCount: string | undefined;
  commentCount: string | undefined;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    if (!window.YT) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(scriptTag);
    }

    this.waitForYouTubeAPI();
    this.fetchVideoMetadata();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
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
  }

  fetchVideoMetadata() {
    const apiKey = 'AIzaSyDIrUoOcqJ7D4SUDmm5N5PFRqKDdWY3eSU';
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
      }
    );
  }

}

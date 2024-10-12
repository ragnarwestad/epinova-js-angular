import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'app-youtube-player',
  template: `<div #playerContainer class="player-container"></div>`,
  styleUrls: ['./youtube-player.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class YouTubePlayerComponent implements AfterViewInit, OnDestroy {
  @Input() videoId!: string;
  @ViewChild('playerContainer', { static: false }) playerContainer!: ElementRef;
  player!: any;

  ngAfterViewInit() {
    if (!window.YT) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(scriptTag);
    }

    this.waitForYouTubeAPI();
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
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (function (event: any) {
          console.log('YouTube Player is ready:', event);
        }).bind(this),
        onError: (function (event: any) {
          console.error('YouTube Player error:', event);
        }).bind(this),
      },
    });
  }
}

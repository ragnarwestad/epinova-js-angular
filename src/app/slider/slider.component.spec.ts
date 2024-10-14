import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { YouTubePlayerComponent } from '../youtube-player/youtube-player.component';
import { RssFeedReaderComponent } from '../rss-feed-reader/rss-feed-reader.component';
import { LocationDisplayComponent } from '../location-display/location-display.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatButtonModule,
        NoopAnimationsModule,
        YouTubePlayerComponent,
        RssFeedReaderComponent,
        LocationDisplayComponent,
        SliderComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the next image', () => {
    component.currentIndex = 0;
    component.nextSlide();
    expect(component.currentIndex).toBe(1);
  });

  it('should navigate to the previous image', () => {
    component.currentIndex = 1;
    component.prevSlide();
    expect(component.currentIndex).toBe(0);
  });

  it('should loop to the first image when navigating next from the last image', () => {
    component.currentIndex = 2;
    component.nextSlide();
    expect(component.currentIndex).toBe(0);
  });

  it('should loop to the last image when navigating previous from the first image', () => {
    component.currentIndex = 0;
    component.prevSlide();
    expect(component.currentIndex).toBe(2);
  });
});

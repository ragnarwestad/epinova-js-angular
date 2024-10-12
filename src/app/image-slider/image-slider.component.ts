import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  imports: [
    MatButton,
    NgIf
  ],
  standalone: true
})
export class ImageSliderComponent implements OnInit {
  images: string[] = [
    'assets/en-gruppe-i-et-mote.jpg',
  ];
  podcastUrl: string = 'https://embed.acast.com/your-podcast-id';
  currentIndex: number = 0;
  location: string = '';

  ngOnInit() {
    this.getLocation();
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
}

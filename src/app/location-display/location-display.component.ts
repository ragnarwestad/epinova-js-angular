import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-location-display',
  template: '<p>{{ location }}</p>',
  standalone: true,
  imports: [NgIf]
})
export class LocationDisplayComponent implements OnInit {
  location: string = '';

  ngOnInit() {
    this.getLocation();
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

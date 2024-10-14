import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-location-display',
  templateUrl: './location-display.component.html',
  styleUrls: ['./location-display.component.scss'],
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule]
})
export class LocationDisplayComponent implements OnInit {
  isLoading = true;
  location: string = '';

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        this.isLoading = false;
        console.log(this.location);
      });
    } else {
      this.location = 'Geolocation is not supported by this browser.';
      this.isLoading = false;
    }
  }
}

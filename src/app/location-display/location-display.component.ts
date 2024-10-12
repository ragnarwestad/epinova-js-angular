import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-location-display',
  template: `
    <div *ngIf="isLoading" class="location-container">
      <mat-spinner diameter="40"></mat-spinner>
      <div>Henter lokasjon ...</div>
    </div>
    <div *ngIf="!isLoading">
      <p>{{ location }}</p>
    </div>
  `,
  styles: ['.location-container { display: flex; flex-direction: column; align-items: center}'],
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

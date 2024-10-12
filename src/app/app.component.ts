import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageSliderComponent } from './image-slider/image-slider.component';

@Component({
  selector: 'app-root',
  template: '<div class="app-style"><app-image-slider></app-image-slider></div>',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, ImageSliderComponent] // Import ImageSliderComponent here
})
export class AppComponent {}

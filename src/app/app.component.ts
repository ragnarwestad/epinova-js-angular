import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './slider/slider.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-title">{{ title }}</div>
    <div class="app-style">
      <app-slider></app-slider>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, SliderComponent]
})
export class AppComponent {
  title = 'Epinova JS Angular';
}

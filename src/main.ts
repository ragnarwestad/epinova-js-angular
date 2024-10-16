import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Update with the correct path to your AppComponent

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule) // Ensure this is included in the providers
  ]
}).catch(err => console.error(err));

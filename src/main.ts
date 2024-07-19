import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import your app config

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule), // Include HttpClientModule
    appConfig.providers, provideAnimationsAsync(), provideAnimationsAsync() // Use app config providers
  ]
}).catch(err => console.error(err));

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes'; // Ensure this matches the export
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './services/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Configure zone change detection
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([customInterceptor])) // Configure routing
  ]
};

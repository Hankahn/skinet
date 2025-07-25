import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {loadingInterceptor} from './core/interceptors/loading.interceptor';
import {InitService} from './core/services/init.service';
import {lastValueFrom} from 'rxjs';

async function initializeApp() {
  const initService = inject(InitService);
  try {
    return await lastValueFrom(initService.init());
  } finally {
    const splash = document.getElementById('initial-splash');

    if (splash) {
      splash.remove();
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([
      errorInterceptor,
      loadingInterceptor])),
    provideAppInitializer(initializeApp)
  ]
};

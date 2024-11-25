// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/core/services/auth.interceptor';


// Extiende la configuración de la aplicación para incluir el interceptor
const extendedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptors([AuthInterceptor])), // Añade el interceptor aquí
  ],
};

bootstrapApplication(AppComponent, extendedAppConfig).catch((err) => console.error(err));
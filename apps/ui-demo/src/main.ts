import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { universalProviders } from '@universal/universal.providers';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), universalProviders()]
}).catch(err => console.error(err));

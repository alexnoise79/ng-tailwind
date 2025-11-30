import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgtCarouselConfig {
  animations = true;
  interval = 5000;
  keyboard = true;
  pauseOnFocus = true;
  pauseOnHover = true;
  showNavigationArrows = true;
  showNavigationIndicators = true;
  wrap = true;
}


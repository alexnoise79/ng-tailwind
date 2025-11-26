import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* Create a new injection token for injecting the window into a component. */
export const WINDOW = new InjectionToken<Window | null>('WindowToken', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId) && typeof window !== 'undefined') {
      const ua = window.navigator.userAgent;
      window.isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dol(fin|phin)|Skyfire|Zune/.test(ua);
      window.isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua.toLowerCase());
      window.isDesktop = !window.isMobile && !window.isTablet;
      window.isMac = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform);
      window.isWin = /(Win32)/i.test(window.navigator.platform);
      return window;
    }

    return null;
  }
});

declare global {
  interface Window {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isMac: boolean;
    isWin: boolean;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  device$: BehaviorSubject<Window>;
  private window = inject<Window>(WINDOW);

  constructor() {
    this.device$ = new BehaviorSubject<Window>(this.window);
  }
}

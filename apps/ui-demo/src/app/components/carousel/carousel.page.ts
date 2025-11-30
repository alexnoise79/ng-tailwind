import { Component, signal, inject } from '@angular/core';
import { NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService, NgtCarousel, NgtCarouselSlide, NgtSlideEventSource } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.carousel',
  imports: [NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtCarousel, NgtCarouselSlide],
  templateUrl: './carousel.page.html'
})
export class CarouselPage {
  private toastService = inject(NgtToastService);
  activeSlide = signal('slide-1');

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      withControls: 'showcase',
      withoutIndicators: 'showcase',
      customInterval: 'showcase'
    },
    {
      basic: 'html',
      withControls: 'html',
      withoutIndicators: 'html',
      customInterval: 'html'
    }
  );

  // Expose utility methods for template
  toggleDemoView = (demoKey: string) => this.codeViewUtil.toggleDemoView(demoKey);
  setActiveCodeTab = (demoKey: string, tab: 'html' | 'ts') => this.codeViewUtil.setActiveCodeTab(demoKey, tab);
  isShowingCode = (demoKey: string) => this.codeViewUtil.isShowingCode(demoKey);
  getActiveCodeTab = (demoKey: string) => this.codeViewUtil.getActiveCodeTab(demoKey, 'html');

  // Copy to clipboard functionality
  copyToClipboard(code: string) {
    copyToClipboard(code, this.toastService);
  }

  onSlideChange(event: { activeId: string; source: NgtSlideEventSource }) {
    this.activeSlide.set(event.activeId);
  }

  // Code snippets for each demo
  codeSnippets = {
    basic: {
      html: `<ngt-carousel [activeId]="activeSlide()" (slid)="onSlideChange($event)">
  <ngt-carousel-slide id="slide-1">
    <div class="flex h-64 items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-lg">
      <p class="text-2xl font-semibold text-primary-700 dark:text-primary-300">Slide 1</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-2">
    <div class="flex h-64 items-center justify-center bg-secondary-100 dark:bg-secondary-900 rounded-lg">
      <p class="text-2xl font-semibold text-secondary-700 dark:text-secondary-300">Slide 2</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-3">
    <div class="flex h-64 items-center justify-center bg-success-100 dark:bg-success-900 rounded-lg">
      <p class="text-2xl font-semibold text-success-700 dark:text-success-300">Slide 3</p>
    </div>
  </ngt-carousel-slide>
</ngt-carousel>`,
      ts: `import { signal } from '@angular/core';
import { NgtCarousel, NgtCarouselSlide, NgtSlideEventSource } from '@ngtailwind/ui-components';

export class CarouselPage {
  activeSlide = signal('slide-1');

  onSlideChange(event: { activeId: string; source: NgtSlideEventSource }) {
    this.activeSlide.set(event.activeId);
  }
}`
    },
    withControls: {
      html: `<ngt-carousel [activeId]="activeSlide()" [showNavigationArrows]="true" [showNavigationIndicators]="true" (slid)="onSlideChange($event)">
  <ngt-carousel-slide id="slide-1">
    <div class="flex h-64 items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-lg">
      <p class="text-2xl font-semibold text-primary-700 dark:text-primary-300">Slide 1</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-2">
    <div class="flex h-64 items-center justify-center bg-secondary-100 dark:bg-secondary-900 rounded-lg">
      <p class="text-2xl font-semibold text-secondary-700 dark:text-secondary-300">Slide 2</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-3">
    <div class="flex h-64 items-center justify-center bg-success-100 dark:bg-success-900 rounded-lg">
      <p class="text-2xl font-semibold text-success-700 dark:text-success-300">Slide 3</p>
    </div>
  </ngt-carousel-slide>
</ngt-carousel>`,
      ts: `import { signal } from '@angular/core';
import { NgtCarousel, NgtCarouselSlide, NgtSlideEventSource } from '@ngtailwind/ui-components';

export class CarouselPage {
  activeSlide = signal('slide-1');

  onSlideChange(event: { activeId: string; source: NgtSlideEventSource }) {
    this.activeSlide.set(event.activeId);
  }
}`
    },
    withoutIndicators: {
      html: `<ngt-carousel [activeId]="activeSlide()" [showNavigationIndicators]="false" (slid)="onSlideChange($event)">
  <ngt-carousel-slide id="slide-1">
    <div class="flex h-64 items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-lg">
      <p class="text-2xl font-semibold text-primary-700 dark:text-primary-300">Slide 1</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-2">
    <div class="flex h-64 items-center justify-center bg-secondary-100 dark:bg-secondary-900 rounded-lg">
      <p class="text-2xl font-semibold text-secondary-700 dark:text-secondary-300">Slide 2</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-3">
    <div class="flex h-64 items-center justify-center bg-success-100 dark:bg-success-900 rounded-lg">
      <p class="text-2xl font-semibold text-success-700 dark:text-success-300">Slide 3</p>
    </div>
  </ngt-carousel-slide>
</ngt-carousel>`,
      ts: `import { signal } from '@angular/core';
import { NgtCarousel, NgtCarouselSlide, NgtSlideEventSource } from '@ngtailwind/ui-components';

export class CarouselPage {
  activeSlide = signal('slide-1');

  onSlideChange(event: { activeId: string; source: NgtSlideEventSource }) {
    this.activeSlide.set(event.activeId);
  }
}`
    },
    customInterval: {
      html: `<ngt-carousel [activeId]="activeSlide()" [interval]="2000" (slid)="onSlideChange($event)">
  <ngt-carousel-slide id="slide-1">
    <div class="flex h-64 items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-lg">
      <p class="text-2xl font-semibold text-primary-700 dark:text-primary-300">Slide 1</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-2">
    <div class="flex h-64 items-center justify-center bg-secondary-100 dark:bg-secondary-900 rounded-lg">
      <p class="text-2xl font-semibold text-secondary-700 dark:text-secondary-300">Slide 2</p>
    </div>
  </ngt-carousel-slide>
  <ngt-carousel-slide id="slide-3">
    <div class="flex h-64 items-center justify-center bg-success-100 dark:bg-success-900 rounded-lg">
      <p class="text-2xl font-semibold text-success-700 dark:text-success-300">Slide 3</p>
    </div>
  </ngt-carousel-slide>
</ngt-carousel>`,
      ts: `import { signal } from '@angular/core';
import { NgtCarousel, NgtCarouselSlide, NgtSlideEventSource } from '@ngtailwind/ui-components';

export class CarouselPage {
  activeSlide = signal('slide-1');

  onSlideChange(event: { activeId: string; source: NgtSlideEventSource }) {
    this.activeSlide.set(event.activeId);
  }
}`
    }
  };

  // Helper to get code snippet for a specific tab
  getCodeSnippet(demoKey: string, fileType: 'html' | 'ts'): string {
    return this.codeViewUtil.getCodeSnippet(this.codeSnippets, demoKey, fileType);
  }

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'carousel-basic.html',
        ts: 'carousel-basic.ts'
      },
      withControls: {
        html: 'carousel-with-controls.html',
        ts: 'carousel-with-controls.ts'
      },
      withoutIndicators: {
        html: 'carousel-without-indicators.html',
        ts: 'carousel-without-indicators.ts'
      },
      customInterval: {
        html: 'carousel-custom-interval.html',
        ts: 'carousel-custom-interval.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('carousel', demoKey, fileType, fileNames);
  }
}


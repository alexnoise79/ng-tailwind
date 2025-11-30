import { Component, inject } from '@angular/core';
import { NgtCarousel, NgtSlide, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet, NgtToastService } from '@ngtailwind/ui-components';
import { copyToClipboard } from '../../utils/copy-to-clipboard.util';
import { DemoCodeViewUtil } from '../../utils/demo-code-view.util';

@Component({
  selector: 'section.carousel',
  imports: [NgtCarousel, NgtSlide, NgtNav, NgtNavItem, NgtNavContent, NgtNavOutlet],
  templateUrl: './carousel.page.html'
})
export class CarouselPage {
  private toastService = inject(NgtToastService);

  // Demo code view utility
  codeViewUtil = new DemoCodeViewUtil(
    {
      basic: 'showcase',
      fade: 'showcase',
      withControls: 'showcase',
      withoutIndicators: 'showcase'
    },
    {
      basic: 'html',
      fade: 'html',
      withControls: 'html',
      withoutIndicators: 'html'
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

  // Code snippets for each demo
  codeSnippets = {
    basic: `<ngt-carousel [animation]="'slide'" [interval]="5000">
  <ng-template ngtSlide [id]="'slide-1'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600" />
        <img src="https://placehold.co/400x300" alt="Slide 1" class="w-full h-96 object-cover" />
      </picture>
    </div>
    <div class="carousel-caption">
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </div>
  </ng-template>
  <ng-template ngtSlide [id]="'slide-2'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800/0066CC/FFFFFF" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600/0066CC/FFFFFF" />
        <img src="https://placehold.co/400x300/0066CC/FFFFFF" alt="Slide 2" class="w-full h-96 object-cover" />
      </picture>
    </div>
    <div class="carousel-caption">
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </ng-template>
  <ng-template ngtSlide [id]="'slide-3'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800/CC0066/FFFFFF" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600/CC0066/FFFFFF" />
        <img src="https://placehold.co/400x300/CC0066/FFFFFF" alt="Slide 3" class="w-full h-96 object-cover" />
      </picture>
    </div>
    <div class="carousel-caption">
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </div>
  </ng-template>
</ngt-carousel>`,
    fade: `<ngt-carousel [animation]="'fade'" [interval]="5000">
  <ng-template ngtSlide [id]="'fade-slide-1'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600" />
        <img src="https://placehold.co/400x300" alt="Fade Slide 1" class="w-full h-96 object-cover" />
      </picture>
    </div>
    <div class="carousel-caption">
      <h3>Fade Animation</h3>
      <p>This carousel uses fade animation instead of slide.</p>
    </div>
  </ng-template>
  <ng-template ngtSlide [id]="'fade-slide-2'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800/0066CC/FFFFFF" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600/0066CC/FFFFFF" />
        <img src="https://placehold.co/400x300/0066CC/FFFFFF" alt="Fade Slide 2" class="w-full h-96 object-cover" />
      </picture>
    </div>
    <div class="carousel-caption">
      <h3>Second Fade Slide</h3>
      <p>Smooth fade transition between slides.</p>
    </div>
  </ng-template>
</ngt-carousel>`,
    withControls: `<ngt-carousel [animation]="'slide'" [showNavigationArrows]="true" [showNavigationIndicators]="true">
  <ng-template ngtSlide [id]="'control-slide-1'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600" />
        <img src="https://placehold.co/400x300" alt="Control Slide 1" class="w-full h-96 object-cover" />
      </picture>
    </div>
  </ng-template>
  <ng-template ngtSlide [id]="'control-slide-2'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800/0066CC/FFFFFF" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600/0066CC/FFFFFF" />
        <img src="https://placehold.co/400x300/0066CC/FFFFFF" alt="Control Slide 2" class="w-full h-96 object-cover" />
      </picture>
    </div>
  </ng-template>
</ngt-carousel>`,
    withoutIndicators: `<ngt-carousel [animation]="'slide'" [showNavigationIndicators]="false">
  <ng-template ngtSlide [id]="'no-indicator-slide-1'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600" />
        <img src="https://placehold.co/400x300" alt="No Indicator Slide 1" class="w-full h-96 object-cover" />
      </picture>
    </div>
  </ng-template>
  <ng-template ngtSlide [id]="'no-indicator-slide-2'">
    <div class="picsum-img-wrapper">
      <picture>
        <source media="(min-width: 1024px)" srcset="https://placehold.co/1200x800/0066CC/FFFFFF" />
        <source media="(min-width: 768px)" srcset="https://placehold.co/800x600/0066CC/FFFFFF" />
        <img src="https://placehold.co/400x300/0066CC/FFFFFF" alt="No Indicator Slide 2" class="w-full h-96 object-cover" />
      </picture>
    </div>
  </ng-template>
</ngt-carousel>`
  };

  // Helper to get tab file name based on demo key
  getTabFileName(demoKey: string, fileType: 'html' | 'ts'): string {
    const fileNames: Record<string, Record<'html' | 'ts', string>> = {
      basic: {
        html: 'carousel-basic.html',
        ts: 'carousel-basic.ts'
      },
      fade: {
        html: 'carousel-fade.html',
        ts: 'carousel-fade.ts'
      },
      withControls: {
        html: 'carousel-with-controls.html',
        ts: 'carousel-with-controls.ts'
      },
      withoutIndicators: {
        html: 'carousel-without-indicators.html',
        ts: 'carousel-without-indicators.ts'
      }
    };
    return this.codeViewUtil.getTabFileName('carousel', demoKey, fileType, fileNames);
  }
}


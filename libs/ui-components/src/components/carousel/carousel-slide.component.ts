import { Component, input, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { NgtCarousel } from './carousel.component';

@Component({
  selector: 'ngt-carousel-slide',
  template: '<ng-content />',
  host: {
    '[class.hidden]': '!isActive()',
    '[class.block]': 'isActive()',
    '[class.w-full]': 'true',
    '[class.flex-shrink-0]': 'true',
    '[attr.role]': '"tabpanel"',
    '[attr.aria-hidden]': '!isActive()'
  }
})
export class NgtCarouselSlide implements OnInit, OnDestroy {
  readonly id = input.required<string>();

  private carousel = inject(NgtCarousel, { optional: true });
  readonly isActive = computed(() => this.carousel?.activeId() === this.id());

  ngOnInit() {
    if (this.carousel) {
      this.carousel.registerSlide(this.id());
    }
  }

  ngOnDestroy() {
    if (this.carousel) {
      this.carousel.unregisterSlide(this.id());
    }
  }
}

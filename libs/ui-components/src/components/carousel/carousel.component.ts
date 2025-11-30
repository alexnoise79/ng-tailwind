import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  signal,
  computed,
  input,
  output,
  inject,
  ElementRef,
  HostListener,
  effect,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { NgtSlide } from './slide.directive';
import { NgtCarouselConfig } from './carousel-config.service';

export type NgtSlideEventSource = 'timer' | 'arrowLeft' | 'arrowRight' | 'indicator' | 'keyboard';

@Component({
  selector: 'ngt-carousel',
  templateUrl: './carousel.component.html',
  imports: [NgTemplateOutlet],
  host: {
    '[attr.role]': '"region"',
    '[attr.aria-label]': '"carousel"',
    '[class.relative]': 'true',
    '[class.overflow-hidden]': 'true'
  }
})
export class NgtCarousel implements AfterContentInit, OnDestroy {
  readonly activeId = input<string>();
  readonly animation = input<'fade' | 'slide'>();
  readonly animations = input<boolean>();
  readonly interval = input<number>();
  readonly keyboard = input<boolean>();
  readonly pauseOnFocus = input<boolean>();
  readonly pauseOnHover = input<boolean>();
  readonly showNavigationArrows = input<boolean>();
  readonly showNavigationIndicators = input<boolean>();
  readonly wrap = input<boolean>();

  readonly slid = output<{ activeId: string; source: NgtSlideEventSource }>();

  @ContentChildren(NgtSlide) slides!: QueryList<NgtSlide>;

  private config = inject(NgtCarouselConfig);
  private elementRef = inject(ElementRef);
  private document = inject(DOCUMENT);
  private injector = inject(Injector);

  slidesList = signal<Array<NgtSlide>>([]);
  activeSlideId = signal<string | null>(null);
  isPaused = signal(false);
  isTransitioning = signal(false);
  private intervalId?: number;
  private keyboardListener?: (event: KeyboardEvent) => void;

  readonly animationsValue = computed(() => this.animations() ?? this.config.animations);
  readonly intervalValue = computed(() => this.interval() ?? this.config.interval);
  readonly keyboardValue = computed(() => this.keyboard() ?? this.config.keyboard);
  readonly pauseOnFocusValue = computed(() => this.pauseOnFocus() ?? this.config.pauseOnFocus);
  readonly pauseOnHoverValue = computed(() => this.pauseOnHover() ?? this.config.pauseOnHover);
  readonly showNavigationArrowsValue = computed(() => this.showNavigationArrows() ?? this.config.showNavigationArrows);
  readonly showNavigationIndicatorsValue = computed(() => this.showNavigationIndicators() ?? this.config.showNavigationIndicators);
  readonly wrapValue = computed(() => this.wrap() ?? this.config.wrap);

  readonly hasSlides = computed(() => this.slidesList().length > 0);
  readonly activeSlideIndex = computed(() => {
    const activeId = this.activeSlideId();
    if (!activeId) return -1;
    return this.slidesList().findIndex(slide => slide.id() === activeId);
  });

  readonly canGoPrev = computed(() => {
    const index = this.activeSlideIndex();
    if (index <= 0) {
      return this.wrapValue();
    }
    return true;
  });

  readonly canGoNext = computed(() => {
    const index = this.activeSlideIndex();
    if (index >= this.slidesList().length - 1) {
      return this.wrapValue();
    }
    return true;
  });

  constructor() {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.animationsValue() && this.intervalValue() > 0 && !this.isPaused() && this.hasSlides()) {
          this.startCycling();
        } else {
          this.stopCycling();
        }
      });

      effect(() => {
        if (this.keyboardValue()) {
          this.setupKeyboardListener();
        } else {
          this.removeKeyboardListener();
        }
      });
    });
  }

  ngAfterContentInit() {
    this.slidesList.set(this.slides.toArray());

    // Set initial active slide
    const initialActiveId = this.activeId();
    if (initialActiveId) {
      this.select(initialActiveId, 'indicator');
    } else if (this.slidesList().length > 0) {
      this.select(this.slidesList()[0].id(), 'indicator');
    }

    // Watch for changes in slides
    this.slides.changes.subscribe({
      next: () => {
        this.slidesList.set(this.slides.toArray());
        const currentActiveId = this.activeSlideId();
        if (currentActiveId && !this.slidesList().some(s => s.id() === currentActiveId)) {
          // Current active slide was removed, select first available
          if (this.slidesList().length > 0) {
            this.select(this.slidesList()[0].id(), 'indicator');
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.stopCycling();
    this.removeKeyboardListener();
  }

  select(slideId: string, source: NgtSlideEventSource = 'indicator') {
    if (this.isTransitioning()) return;

    const slide = this.slidesList().find(s => s.id() === slideId);
    if (!slide) return;

    this.activeSlideId.set(slideId);
    this.isTransitioning.set(true);

    // Emit slid event after transition
    setTimeout(() => {
      this.isTransitioning.set(false);
      this.slid.emit({ activeId: slideId, source });
    }, this.animationsValue() && this.animation() ? 300 : 0);
  }

  prev(source: NgtSlideEventSource = 'arrowLeft') {
    const currentIndex = this.activeSlideIndex();
    if (currentIndex < 0) return;

    let newIndex: number;
    if (currentIndex === 0) {
      if (this.wrapValue()) {
        newIndex = this.slidesList().length - 1;
      } else {
        return;
      }
    } else {
      newIndex = currentIndex - 1;
    }

    const slide = this.slidesList()[newIndex];
    if (slide) {
      this.select(slide.id(), source);
    }
  }

  next(source: NgtSlideEventSource = 'arrowRight') {
    const currentIndex = this.activeSlideIndex();
    if (currentIndex < 0) return;

    let newIndex: number;
    if (currentIndex >= this.slidesList().length - 1) {
      if (this.wrapValue()) {
        newIndex = 0;
      } else {
        return;
      }
    } else {
      newIndex = currentIndex + 1;
    }

    const slide = this.slidesList()[newIndex];
    if (slide) {
      this.select(slide.id(), source);
    }
  }

  pause() {
    this.isPaused.set(true);
    this.stopCycling();
  }

  cycle() {
    this.isPaused.set(false);
    if (this.animationsValue() && this.intervalValue() > 0 && this.hasSlides()) {
      this.startCycling();
    }
  }

  focus() {
    const carouselElement = this.elementRef.nativeElement;
    if (carouselElement && typeof carouselElement.focus === 'function') {
      carouselElement.focus();
    }
  }

  private startCycling() {
    this.stopCycling();
    if (this.intervalValue() > 0) {
      this.intervalId = window.setInterval(() => {
        if (!this.isPaused() && !this.isTransitioning()) {
          this.next('timer');
        }
      }, this.intervalValue());
    }
  }

  private stopCycling() {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private setupKeyboardListener() {
    this.removeKeyboardListener();
    this.keyboardListener = (event: KeyboardEvent) => {
      const carouselElement = this.elementRef.nativeElement;
      if (!carouselElement.contains(event.target as Node)) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.prev('keyboard');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.next('keyboard');
      }
    };
    this.document.addEventListener('keydown', this.keyboardListener);
  }

  private removeKeyboardListener() {
    if (this.keyboardListener) {
      this.document.removeEventListener('keydown', this.keyboardListener);
      this.keyboardListener = undefined;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.pauseOnHoverValue()) {
      this.pause();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.pauseOnHoverValue()) {
      this.cycle();
    }
  }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: FocusEvent) {
    if (this.pauseOnFocusValue()) {
      const carouselElement = this.elementRef.nativeElement;
      if (carouselElement.contains(event.target as Node)) {
        this.pause();
      }
    }
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent) {
    if (this.pauseOnFocusValue()) {
      const carouselElement = this.elementRef.nativeElement;
      if (!carouselElement.contains(event.relatedTarget as Node)) {
        this.cycle();
      }
    }
  }

  getAnimationClass(): string {
    if (!this.animationsValue() || !this.animation()) {
      return '';
    }
    return this.animation() === 'fade' ? 'transition-opacity duration-300' : 'transition-transform duration-300';
  }

  getSlideClasses(slide: NgtSlide): string {
    const isActive = this.activeSlideId() === slide.id();
    const baseClasses = 'absolute inset-0';
    
    if (!this.animationsValue() || !this.animation()) {
      return isActive ? `${baseClasses} block` : `${baseClasses} hidden`;
    }

    if (this.animation() === 'fade') {
      return isActive 
        ? `${baseClasses} opacity-100 z-10` 
        : `${baseClasses} opacity-0 z-0`;
    } else {
      // slide animation
      const currentIndex = this.activeSlideIndex();
      const slideIndex = this.slidesList().findIndex(s => s.id() === slide.id());
      const offset = slideIndex - currentIndex;
      
      if (isActive) {
        return `${baseClasses} translate-x-0 z-10`;
      } else if (offset > 0) {
        return `${baseClasses} translate-x-full z-0`;
      } else {
        return `${baseClasses} -translate-x-full z-0`;
      }
    }
  }
}


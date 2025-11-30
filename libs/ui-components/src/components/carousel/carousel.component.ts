import { Component, Input, OnInit, OnDestroy, inject, ViewChild, ElementRef, signal, Signal, WritableSignal, input, output, computed, effect, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgtCarouselConfig } from './carousel-config.service';
import { NgtSlideEventSource } from './carousel.types';
import { NgtCarouselSlide } from './carousel-slide.component';

@Component({
  selector: 'ngt-carousel',
  templateUrl: './carousel.component.html',
  host: {
    '[attr.role]': '"region"',
    '[attr.aria-label]': '"Carousel"'
  }
})
export class NgtCarousel implements OnInit, OnDestroy, AfterContentInit {
  @Input() set activeId(value: string | WritableSignal<string> | undefined) {
    if (value === undefined) {
      return;
    }
    if (typeof value === 'string') {
      this._activeId.set(value);
    } else {
      this._activeId = value;
    }
  }
  private _activeId: WritableSignal<string> = signal('');

  readonly animation = input<boolean>();
  readonly interval = input<number>();
  readonly keyboard = input<boolean>();
  readonly pauseOnFocus = input<boolean>();
  readonly pauseOnHover = input<boolean>();
  readonly showNavigationArrows = input<boolean>();
  readonly showNavigationIndicators = input<boolean>();
  readonly wrap = input<boolean>();

  readonly slid = output<{ activeId: string; source: NgtSlideEventSource }>();

  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;
  @ContentChildren(NgtCarouselSlide) slides!: QueryList<NgtCarouselSlide>;

  private config = inject(NgtCarouselConfig);
  private document = inject(DOCUMENT);
  private intervalId?: ReturnType<typeof setInterval>;
  private isPaused = signal(false);
  private slidesSet = new Set<string>();

  get activeId(): Signal<string> {
    return this._activeId;
  }
  readonly isAnimating = signal(false);

  readonly configAnimation = computed(() => this.animation() ?? this.config.animation);
  readonly configInterval = computed(() => this.interval() ?? this.config.interval);
  readonly configKeyboard = computed(() => this.keyboard() ?? this.config.keyboard);
  readonly configPauseOnFocus = computed(() => this.pauseOnFocus() ?? this.config.pauseOnFocus);
  readonly configPauseOnHover = computed(() => this.pauseOnHover() ?? this.config.pauseOnHover);
  readonly configShowNavigationArrows = computed(() => this.showNavigationArrows() ?? this.config.showNavigationArrows);
  readonly configShowNavigationIndicators = computed(() => this.showNavigationIndicators() ?? this.config.showNavigationIndicators);
  readonly configWrap = computed(() => this.wrap() ?? this.config.wrap);

  readonly slideIds = computed(() => Array.from(this.slidesSet).sort());

  private effectRef?: ReturnType<typeof effect>;
  private keyboardListener?: (event: KeyboardEvent) => void;

  // Expose enum to template
  readonly NgtSlideEventSource = NgtSlideEventSource;

  constructor() {
    this.effectRef = effect(() => {
      const active = this.activeId();
      if (active && this.slidesSet.has(active)) {
        this.startCycling();
      }
    });
  }

  ngOnInit() {
    if (this.configKeyboard()) {
      this.keyboardListener = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
          this.prev(NgtSlideEventSource.ARROW_LEFT);
        } else if (event.key === 'ArrowRight') {
          this.next(NgtSlideEventSource.ARROW_RIGHT);
        }
      };
      this.document.addEventListener('keydown', this.keyboardListener);
    }
  }

  ngAfterContentInit() {
    // Register all slides
    this.slides.forEach(slide => {
      this.registerSlide(slide.id());
    });

    // Set initial active slide if not set
    if (!this.activeId() && this.slides.length > 0) {
      const firstSlide = this.slides.first;
      if (firstSlide) {
        this._activeId.set(firstSlide.id());
      }
    }

    // Start cycling if we have slides
    if (this.slides.length > 0 && this.activeId()) {
      this.startCycling();
    }
  }

  ngOnDestroy() {
    this.stopCycling();
    if (this.keyboardListener) {
      this.document.removeEventListener('keydown', this.keyboardListener);
    }
    if (this.effectRef) {
      this.effectRef.destroy();
    }
  }

  registerSlide(id: string) {
    this.slidesSet.add(id);
  }

  unregisterSlide(id: string) {
    this.slidesSet.delete(id);
  }

  select(slideId: string, source: NgtSlideEventSource = NgtSlideEventSource.API) {
    if (!this.slidesSet.has(slideId)) {
      return;
    }

    if (this.isAnimating()) {
      return;
    }

    this._activeId.set(slideId);
    this.emitSlidEvent(source);
  }

  prev(source: NgtSlideEventSource = NgtSlideEventSource.API) {
    const currentIndex = this.getCurrentIndex();
    if (currentIndex === -1) {
      return;
    }

    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      this.select(this.slideIds()[prevIndex], source);
    } else if (this.configWrap()) {
      this.select(this.slideIds()[this.slideIds().length - 1], source);
    }
  }

  next(source: NgtSlideEventSource = NgtSlideEventSource.API) {
    const currentIndex = this.getCurrentIndex();
    if (currentIndex === -1) {
      return;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < this.slideIds().length) {
      this.select(this.slideIds()[nextIndex], source);
    } else if (this.configWrap()) {
      this.select(this.slideIds()[0], source);
    }
  }

  pause() {
    this.isPaused.set(true);
    this.stopCycling();
  }

  cycle() {
    this.isPaused.set(false);
    this.startCycling();
  }

  focus() {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.focus();
    }
  }

  onMouseEnter() {
    if (this.configPauseOnHover()) {
      this.pause();
    }
  }

  onMouseLeave() {
    if (this.configPauseOnHover()) {
      this.cycle();
    }
  }

  onFocus() {
    if (this.configPauseOnFocus()) {
      this.pause();
    }
  }

  onBlur() {
    if (this.configPauseOnFocus()) {
      this.cycle();
    }
  }

  onIndicatorClick(slideId: string) {
    this.select(slideId, NgtSlideEventSource.INDICATOR);
  }

  private getCurrentIndex(): number {
    const activeId = this.activeId();
    if (!activeId) {
      return -1;
    }
    return this.slideIds().indexOf(activeId);
  }

  private startCycling() {
    this.stopCycling();
    if (this.configInterval() > 0 && !this.isPaused() && this.slideIds().length > 1) {
      this.intervalId = setInterval(() => {
        if (!this.isPaused()) {
          this.next(NgtSlideEventSource.TIMER);
        }
      }, this.configInterval());
    }
  }

  private stopCycling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private emitSlidEvent(source: NgtSlideEventSource) {
    if (this.configAnimation()) {
      this.isAnimating.set(true);
      setTimeout(() => {
        this.isAnimating.set(false);
        this.slid.emit({ activeId: this.activeId(), source });
      }, 300);
    } else {
      this.slid.emit({ activeId: this.activeId(), source });
    }
  }
}

import { Directive, ElementRef, Renderer2, OnDestroy, input, signal, computed, inject, HostListener, effect } from '@angular/core';
import { Position } from '../../models';

@Directive({
  selector: '[ngtTooltip]',
  standalone: true
})
export class NgtTooltip implements OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  readonly ngtTooltip = input.required<string>();
  readonly tooltipPosition = input<Position>('top');
  readonly tooltipDelay = input<number>(200);
  readonly tooltipShowDelay = input<number>(200);
  readonly tooltipHideDelay = input<number>(200);

  private showTimeout?: number;
  private hideTimeout?: number;
  private tooltipElement: HTMLElement | null = null;

  isVisible = signal(false);

  private readonly tooltipClasses = computed(() => {
    const base = 'absolute z-50 px-2 py-1 text-sm text-white dark:text-gray-900 bg-gray-900 dark:bg-gray-100 rounded-md shadow-lg pointer-events-none whitespace-nowrap';
    const positionClasses: Record<Position, string> = {
      top: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
      bottom: 'top-full mt-1 left-1/2 -translate-x-1/2',
      left: 'right-full mr-1 top-1/2 -translate-y-1/2',
      right: 'left-full ml-1 top-1/2 -translate-y-1/2'
    };
    return `${base} ${positionClasses[this.tooltipPosition()]}`;
  });

  constructor() {
    // Ensure host element has relative positioning for tooltip absolute positioning
    const hostElement = this.elementRef.nativeElement;
    const currentPosition = window.getComputedStyle(hostElement).position;
    if (currentPosition === 'static' || !currentPosition) {
      this.renderer.setStyle(hostElement, 'position', 'relative');
    }

    // Effect to update tooltip when text or position changes
    effect(() => {
      if (this.tooltipElement && this.isVisible()) {
        this.updateTooltipContent();
      }
    });
  }

  ngOnDestroy(): void {
    this.hide();
    this.removeTooltipElement();
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  private createTooltipElement(): void {
    if (this.tooltipElement) {
      return;
    }

    const hostElement = this.elementRef.nativeElement;

    // Create tooltip element
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.setAttribute(this.tooltipElement, 'role', 'tooltip');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    
    this.updateTooltipContent();
    this.renderer.appendChild(hostElement, this.tooltipElement);
  }

  private updateTooltipContent(): void {
    if (!this.tooltipElement) {
      return;
    }

    // Update text content
    this.renderer.setProperty(this.tooltipElement, 'textContent', this.ngtTooltip());

    // Update classes
    this.renderer.setAttribute(this.tooltipElement, 'class', this.tooltipClasses());
  }

  private removeTooltipElement(): void {
    if (this.tooltipElement && this.tooltipElement.parentElement) {
      this.renderer.removeChild(this.tooltipElement.parentElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }

    // Use tooltipShowDelay (preferred) - both have default 200, so behavior is consistent
    const showDelay = this.tooltipShowDelay();
    this.showTimeout = window.setTimeout(() => {
      this.createTooltipElement();
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'display', 'block');
      }
      this.isVisible.set(true);
    }, showDelay);
  }

  private hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    this.hideTimeout = window.setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'display', 'none');
      }
      this.isVisible.set(false);
    }, this.tooltipHideDelay());
  }

  // Host listeners for showing/hiding tooltip
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  @HostListener('focus')
  onFocus(): void {
    this.show();
  }

  @HostListener('blur')
  onBlur(): void {
    this.hide();
  }
}


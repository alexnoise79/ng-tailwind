import { Directive, ElementRef, Renderer2, OnDestroy, input, signal, computed, inject, HostListener, effect, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';
import { Position } from '../../models';
import { WINDOW } from '@universal/index';

@Directive({
  selector: '[ngtTooltip]'
})
export class NgtTooltip implements OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private viewContainerRef = inject(ViewContainerRef);
  private window = inject(WINDOW);

  readonly ngtTooltip = input<string>('');
  readonly content = input<string | TemplateRef<HTMLElement> | null>(null);
  readonly tooltipPosition = input<Position>('top');
  readonly delay = input<number>(200);
  readonly showDelay = input<number>(200);
  readonly hideDelay = input<number>(200);

  private showTimeout?: number;
  private hideTimeout?: number;
  private tooltipElement: HTMLElement | null = null;
  private embeddedViewRef: EmbeddedViewRef<unknown> | null = null;

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
    if (this.window) {
      const hostElement = this.elementRef.nativeElement;
      const currentPosition = this.window.getComputedStyle(hostElement).position;
      if (currentPosition === 'static' || !currentPosition) {
        this.renderer.setStyle(hostElement, 'position', 'relative');
      }
    }

    // Effect to update tooltip when content, text or position changes
    effect(() => {
      // Access both inputs to track changes
      this.content();
      this.ngtTooltip();
      this.tooltipPosition();
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

    // Get content: prefer content input, otherwise use ngtTooltip
    const contentValue = this.content();
    const tooltipValue = this.ngtTooltip();

    // Clear existing embedded view if any
    if (this.embeddedViewRef) {
      this.embeddedViewRef.destroy();
      this.embeddedViewRef = null;
    }

    // Clear tooltip element content
    while (this.tooltipElement.firstChild) {
      this.renderer.removeChild(this.tooltipElement, this.tooltipElement.firstChild);
    }

    // Update classes
    this.renderer.setAttribute(this.tooltipElement, 'class', this.tooltipClasses());

    // Handle TemplateRef or string content
    if (contentValue instanceof TemplateRef) {
      // Create embedded view from TemplateRef
      this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(contentValue);
      // Attach root nodes to tooltip element
      this.embeddedViewRef.rootNodes.forEach(node => {
        this.renderer.appendChild(this.tooltipElement, node);
      });
      // Detect changes to ensure bindings are applied
      this.embeddedViewRef.detectChanges();
    } else if (contentValue !== null && typeof contentValue === 'string') {
      // Use content string if provided
      this.renderer.setProperty(this.tooltipElement, 'textContent', contentValue);
    } else if (tooltipValue) {
      // Fall back to ngtTooltip
      this.renderer.setProperty(this.tooltipElement, 'textContent', tooltipValue);
    }
  }

  private removeTooltipElement(): void {
    if (this.embeddedViewRef) {
      this.embeddedViewRef.destroy();
      this.embeddedViewRef = null;
    }
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

    // Use showDelay (preferred) or fall back to delay for backward compatibility
    if (!this.window) return;
    const showDelayValue = this.showDelay() !== 200 ? this.showDelay() : this.delay();
    this.showTimeout = this.window.setTimeout(() => {
      this.createTooltipElement();
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'display', 'block');
      }
      this.isVisible.set(true);
    }, showDelayValue);
  }

  private hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    if (!this.window) return;
    this.hideTimeout = this.window.setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'display', 'none');
      }
      this.isVisible.set(false);
    }, this.hideDelay());
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

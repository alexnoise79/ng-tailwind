import {
  Component,
  Input,
  signal,
  computed,
  OnDestroy,
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  template: `
    <div
      class="relative inline-block"
      (mouseenter)="show()"
      (mouseleave)="hide()"
      (focus)="show()"
      (blur)="hide()"
    >
      <ng-content />
      @if (isVisible()) {
        <div
          [class]="tooltipClasses()"
          role="tooltip"
        >
          {{ text }}
        </div>
      }
    </div>
  `,
})
export class TooltipComponent implements OnDestroy {
  @Input() text!: string;
  @Input() position: TooltipPosition = 'top';
  @Input() delay = 200;

  private showTimeout?: number;
  private hideTimeout?: number;

  isVisible = signal(false);

  tooltipClasses = computed(() => {
    const base = 'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md shadow-lg pointer-events-none whitespace-nowrap';
    const positionClasses: Record<TooltipPosition, string> = {
      top: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
      bottom: 'top-full mt-1 left-1/2 -translate-x-1/2',
      left: 'right-full mr-1 top-1/2 -translate-y-1/2',
      right: 'left-full ml-1 top-1/2 -translate-y-1/2',
    };
    return `${base} ${positionClasses[this.position]}`;
  });

  ngOnDestroy(): void {
    this.hide();
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
    this.showTimeout = window.setTimeout(() => {
      this.isVisible.set(true);
    }, this.delay);
  }

  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    this.hideTimeout = window.setTimeout(() => {
      this.isVisible.set(false);
    }, 50);
  }
}


import {
  Component,
  Input,
  ContentChild,
  TemplateRef,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { AccordionComponent } from './accordion.component';

let itemIdCounter = 0;

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  template: `
    <div class="accordion-item">
      <button
        type="button"
        [id]="buttonId()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="contentId()"
        class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset transition-colors"
        (click)="toggle()"
      >
        <span class="font-medium text-gray-900">{{ title }}</span>
        <svg
          class="h-5 w-5 text-gray-500 transform transition-transform"
          [class.rotate-180]="isOpen()"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        [id]="contentId()"
        [attr.aria-labelledby]="buttonId()"
        [attr.role]="'region'"
        class="overflow-hidden transition-all duration-300"
        [class.max-h-0]="!isOpen()"
        [class.max-h-[1000px]]="isOpen()"
      >
        <div class="p-4 text-gray-600">
          <ng-content />
        </div>
      </div>
    </div>
  `,
})
export class AccordionItemComponent {
  @Input() title!: string;

  private accordion = inject(AccordionComponent, { optional: true });
  private id = `accordion-item-${itemIdCounter++}`;
  private _isOpen = signal(false);

  buttonId = computed(() => `${this.id}-button`);
  contentId = computed(() => `${this.id}-content`);

  isOpen = computed(() => {
    if (this.accordion) {
      return this.accordion.isItemOpen(this.id);
    }
    return this._isOpen();
  });

  toggle(): void {
    if (this.accordion) {
      this.accordion.toggleItem(this.id);
    } else {
      this._isOpen.update((val) => !val);
    }
  }
}


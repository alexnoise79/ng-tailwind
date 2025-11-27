import { Component, signal, computed, input, output, effect } from '@angular/core';
import { Size } from '../../models';

@Component({
  selector: 'ngt-pagination',
  templateUrl: './pagination.component.html'
})
export class NgtPagination {
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number | null>(null);
  readonly totalItems = input<number | null>(null);
  readonly pageSize = input<number>(10);
  readonly maxVisiblePages = input<number>(5);
  readonly showFirstLast = input<boolean>(true);
  readonly showPrevNext = input<boolean>(true);
  readonly size = input<Size>('md');
  readonly disabled = input<boolean>(false);

  pageChanged = output<number>();

  protected readonly _currentPage = signal(this.currentPage());

  constructor() {
    // Sync currentPage input with internal signal and validate it
    effect(() => {
      const inputPage = this.currentPage();
      const total = this.totalPagesValue();
      // Clamp the page to valid range
      const validPage = Math.max(1, Math.min(inputPage, total));
      this._currentPage.set(validPage);
      // If the input page was invalid, emit the corrected page
      if (inputPage !== validPage) {
        this.pageChanged.emit(validPage);
      }
    });
  }

  private calculateTotalPages(): number {
    const total = this.totalItems();
    const size = this.pageSize();
    if (total === null || size === 0) {
      return 1;
    }
    return Math.ceil(total / size);
  }

  totalPagesValue = computed(() => {
    const explicitTotal = this.totalPages();
    if (explicitTotal !== null) {
      return explicitTotal;
    }
    return this.calculateTotalPages();
  });

  // Slots represent what to display in each <li> element
  // Always returns exactly maxVisiblePages + 2 number of <li> elements
  // Each slot can be: a page number, 'ellipsis', or a special marker for first/last with ellipsis
  paginationSlots = computed(() => {
    const total = this.totalPagesValue();
    const current = this._currentPage();
    const maxVisible = this.maxVisiblePages();
    const totalSlots = maxVisible + 2; // Add 2 extra slots
    const slots: Array<number | 'ellipsis' | { type: 'first-with-ellipsis' } | { type: 'last-with-ellipsis' }> = [];

    if (total <= totalSlots) {
      // Show all pages if total is less than total slots
      for (let i = 1; i <= total; i++) {
        slots.push(i);
      }
    } else {
      // We need exactly totalSlots slots
      // Determine if we need start ellipsis, end ellipsis, or both
      const needsStartEllipsis = current > Math.floor(totalSlots / 2) + 1;
      const needsEndEllipsis = current < total - Math.floor(totalSlots / 2);

      if (needsStartEllipsis && needsEndEllipsis) {
        // Both ellipses: [1+ellipsis] [pages] [ellipsis+last]
        // Structure: [1 button] [ellipsis] [middle pages] [ellipsis] [last button] = exactly totalSlots slots
        slots.push({ type: 'first-with-ellipsis' });
        slots.push('ellipsis');
        const middleCount = totalSlots - 4; // first-with-ellipsis + ellipsis + ellipsis + last-with-ellipsis
        if (middleCount > 0) {
          const startPage = Math.max(2, current - Math.floor(middleCount / 2));
          const endPage = Math.min(total - 1, startPage + middleCount - 1);
          // Adjust if near boundaries
          if (endPage >= total - 1) {
            const adjustedStart = Math.max(2, total - middleCount);
            for (let i = adjustedStart; i < total; i++) {
              slots.push(i);
            }
          } else if (startPage <= 2) {
            for (let i = 2; i < 2 + middleCount; i++) {
              slots.push(i);
            }
          } else {
            for (let i = startPage; i <= endPage; i++) {
              slots.push(i);
            }
          }
        }
        slots.push('ellipsis');
        slots.push({ type: 'last-with-ellipsis' });
      } else if (needsStartEllipsis) {
        // Only start ellipsis: [1+ellipsis] [pages]
        // Structure: [1 button] [ellipsis] [pages] = exactly totalSlots slots
        slots.push({ type: 'first-with-ellipsis' });
        slots.push('ellipsis');
        const pageCount = totalSlots - 2; // first-with-ellipsis + ellipsis
        const startPage = Math.max(2, total - pageCount + 1);
        for (let i = startPage; i <= total; i++) {
          slots.push(i);
        }
      } else if (needsEndEllipsis) {
        // Only end ellipsis: [pages] [ellipsis+last]
        // Structure: [pages] [ellipsis] [last button] = exactly totalSlots slots
        const pageCount = totalSlots - 2; // ellipsis + last-with-ellipsis
        for (let i = 1; i <= pageCount; i++) {
          slots.push(i);
        }
        slots.push('ellipsis');
        slots.push({ type: 'last-with-ellipsis' });
      } else {
        // No ellipses needed (shouldn't happen with total > totalSlots, but handle it)
        for (let i = 1; i <= totalSlots; i++) {
          slots.push(i);
        }
      }
    }

    return slots;
  });

  visiblePages = computed(() => {
    return this.paginationSlots().filter((slot): slot is number => typeof slot === 'number');
  });

  showStartEllipsis = computed(() => {
    const slots = this.paginationSlots();
    return slots.some(slot => typeof slot === 'object' && slot.type === 'first-with-ellipsis');
  });

  showEndEllipsis = computed(() => {
    const slots = this.paginationSlots();
    return slots.some(slot => typeof slot === 'object' && slot.type === 'last-with-ellipsis');
  });

  isFirstPage = computed(() => {
    const current = this._currentPage();
    return current <= 1;
  });

  isLastPage = computed(() => {
    const current = this._currentPage();
    const total = this.totalPagesValue();
    return current >= total;
  });

  goToPage(page: number) {
    if (this.disabled()) {
      return;
    }
    const total = this.totalPagesValue();
    if (page >= 1 && page <= total && page !== this._currentPage()) {
      this._currentPage.set(page);
      this.pageChanged.emit(page);
    }
  }

  goToFirst() {
    if (!this.isFirstPage()) {
      this.goToPage(1);
    }
  }

  goToLast() {
    if (!this.isLastPage()) {
      this.goToPage(this.totalPagesValue());
    }
  }

  goToPrevious() {
    if (!this.isFirstPage()) {
      this.goToPage(this._currentPage() - 1);
    }
  }

  goToNext() {
    if (!this.isLastPage()) {
      this.goToPage(this._currentPage() + 1);
    }
  }

  paginationClasses = computed(() => {
    const baseClasses = 'flex items-center justify-center gap-1';
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };
    return `${baseClasses} ${sizeClasses[this.size()]}`;
  });

  getButtonClasses(isActive: boolean = false, isDisabled: boolean = false): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
    const sizeClasses = {
      sm: 'px-2 py-1 min-w-8',
      md: 'px-3 py-2 min-w-10',
      lg: 'px-4 py-2.5 min-w-12'
    };
    const stateClasses = isActive ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700';
    const disabledClasses = (this.disabled() || isDisabled) ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[this.size()]} ${stateClasses} ${disabledClasses}`;
  }

  getEllipsisClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md';
    const sizeClasses = {
      sm: 'px-2 py-1 min-w-8',
      md: 'px-3 py-2 min-w-10',
      lg: 'px-4 py-2.5 min-w-12'
    };
    return `${baseClasses} ${sizeClasses[this.size()]} text-gray-500 dark:text-gray-400`;
  }
}

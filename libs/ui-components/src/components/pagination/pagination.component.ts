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
    // Sync currentPage input with internal signal
    effect(() => {
      this._currentPage.set(this.currentPage());
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

  visiblePages = computed(() => {
    const total = this.totalPagesValue();
    const current = this._currentPage();
    const maxVisible = this.maxVisiblePages();
    const pages: Array<number> = [];

    if (total <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Calculate which pages to show
      let start = Math.max(1, current - Math.floor(maxVisible / 2));
      let end = Math.min(total, start + maxVisible - 1);

      // Adjust start if we're near the end
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  });

  showStartEllipsis = computed(() => {
    const pages = this.visiblePages();
    return pages.length > 0 && pages[0] > 2;
  });

  showEndEllipsis = computed(() => {
    const total = this.totalPagesValue();
    const pages = this.visiblePages();
    if (pages.length === 0) {
      return false;
    }
    const lastVisible = pages[pages.length - 1];
    return lastVisible < total;
  });

  isFirstPage = computed(() => this._currentPage() === 1);

  isLastPage = computed(() => this._currentPage() === this.totalPagesValue());

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
    const sizeClasses = {
      sm: 'px-2 py-1',
      md: 'px-3 py-2',
      lg: 'px-4 py-2.5'
    };
    return `inline-flex items-center justify-center text-gray-500 dark:text-gray-400 ${sizeClasses[this.size()]}`;
  }
}

import { Component, computed, signal, input, output } from '@angular/core';
import { classMerge } from '../../utils';
import { Variant } from '../../models';

@Component({
  selector: 'ngt-alert',
  templateUrl: './alert.component.html'
})
export class NgtAlert {
  readonly variant = input<Variant>('info');
  readonly dismissible = input(false);

  readonly closed = output<void>();

  private isVisible = signal(true);

  isVisibleValue = computed(() => this.isVisible());

  alertClasses = computed(() => {
    const baseClasses = 'flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 relative';
    const variantClasses: Record<Variant, string> = {
      success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
      info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
      danger: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
      primary: 'bg-primary-50 border-primary-200 text-primary-800 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-200',
      secondary: 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200',
      light: 'bg-gray-100 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100',
      dark: 'bg-gray-900 border-gray-700 text-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-50'
    };
    const visibilityClasses = this.isVisible() ? 'opacity-100' : 'opacity-0 pointer-events-none';
    return classMerge(baseClasses, variantClasses[this.variant()], visibilityClasses);
  });

  iconClasses = computed(() => {
    const baseClasses = 'shrink-0';
    const variantClasses: Record<Variant, string> = {
      success: 'text-green-600 dark:text-green-400',
      info: 'text-blue-600 dark:text-blue-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      danger: 'text-red-600 dark:text-red-400',
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-gray-600 dark:text-gray-400',
      light: 'text-gray-700 dark:text-gray-300',
      dark: 'text-gray-100 dark:text-gray-50'
    };
    return classMerge(baseClasses, variantClasses[this.variant()]);
  });

  defaultIcon = computed(() => {
    const icons: Record<Variant, string> = {
      success: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      danger: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      primary: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      secondary: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      light: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      dark: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[this.variant()];
  });

  handleClose(): void {
    if (this.dismissible()) {
      this.isVisible.set(false);
      setTimeout(() => {
        this.closed.emit();
      }, 300);
    }
  }
}

import { Component, Input, computed, signal, input } from '@angular/core';
import { classMerge } from '../../utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ngt-button',
  templateUrl: './button.component.html'
})
export class NgtButton {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  @Input() set disabled(value: boolean) {
    this._disabled.set(value ?? false);
  }
  private _disabled = signal(false);

  @Input() set loading(value: boolean) {
    this._loading.set(value ?? false);
  }
  private _loading = signal(false);

  isDisabled = computed(() => this._disabled());
  isLoading = computed(() => this._loading());

  buttonClasses = computed(() => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
      ghost: 'text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
    };
    const sizeClasses = {
      sm: this.variant() === 'outline' ? 'px-[calc(0.75rem-1px)] py-[calc(0.375rem-1px)] text-sm' : 'px-3 py-1.5 text-sm',
      md: this.variant() === 'outline' ? 'px-[calc(1rem-1px)] py-[calc(0.5rem-1px)] text-base' : 'px-4 py-2 text-base',
      lg: this.variant() === 'outline' ? 'px-[calc(1.5rem-1px)] py-[calc(0.75rem-1px)] text-lg' : 'px-6 py-3 text-lg'
    };
    return classMerge(baseClasses, variantClasses[this.variant()], sizeClasses[this.size()]);
  });

  handleClick(event: Event): void {
    if (this.isDisabled() || this.isLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }
}

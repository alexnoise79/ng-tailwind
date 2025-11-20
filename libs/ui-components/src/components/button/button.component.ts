import { Component, Input, computed, signal } from '@angular/core';
import { classMerge } from '../../utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

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
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
    };
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };
    return classMerge(baseClasses, variantClasses[this.variant], sizeClasses[this.size]);
  });

  handleClick(event: Event): void {
    if (this.isDisabled() || this.isLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }
}

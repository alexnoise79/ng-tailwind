import { Component, computed, inject, input, signal } from '@angular/core';
import { classMerge } from '../../utils';
import { Variant } from '../../models';
import { NgtProgressbarConfig } from './progressbar-config.service';

@Component({
  selector: 'ngt-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
  host: {
    '[attr.role]': '"progressbar"',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'maxValue()',
    '[attr.aria-valuenow]': 'currentValue()',
    '[attr.aria-label]': 'ariaLabelValue()'
  }
})
export class NgtProgressbar {
  readonly animated = input<boolean>();
  readonly ariaLabel = input<string>();
  readonly height = input<string>();
  readonly max = input<number>();
  readonly showValue = input<boolean>();
  readonly striped = input<boolean>();
  readonly textType = input<string>();
  readonly type = input<string>();
  readonly value = input(0);

  private config = inject(NgtProgressbarConfig);

  readonly animatedValue = computed(() => this.animated() ?? this.config.animated);
  readonly ariaLabelValue = computed(() => this.ariaLabel() ?? this.config.ariaLabel);
  readonly heightValue = computed(() => this.height() ?? this.config.height);
  readonly maxValue = computed(() => {
    const max = this.max() ?? this.config.max;
    return max > 0 ? max : 100;
  });
  readonly showValueValue = computed(() => this.showValue() ?? this.config.showValue);
  readonly stripedValue = computed(() => this.striped() ?? this.config.striped);
  readonly textTypeValue = computed(() => this.textType() ?? this.config.textType);
  readonly typeValue = computed(() => this.type() ?? this.config.type);

  readonly currentValue = computed(() => {
    const val = this.value();
    const max = this.maxValue();
    if (val < 0) return 0;
    if (val > max) return max;
    return val;
  });

  readonly percentage = computed(() => {
    const val = this.currentValue();
    const max = this.maxValue();
    return max > 0 ? Math.round((val / max) * 100) : 0;
  });

  readonly progressbarClasses = computed(() => {
    const baseClasses = 'w-full bg-gray-200 rounded-full overflow-hidden';
    const heightClass = this.heightValue() ? '' : 'h-2';
    return classMerge(baseClasses, heightClass);
  });

  readonly progressbarInnerClasses = computed(() => {
    const baseClasses = 'h-full transition-all duration-300 ease-linear flex items-center justify-center';

    const stripedClass = this.stripedValue() ? 'progress-bar-striped' : '';
    const animatedClass = this.animatedValue() && this.stripedValue() ? 'animate-stripes' : '';

    const variant = this.typeValue() as Variant | undefined;
    const variantClasses: Record<Variant, string> = {
      success: 'bg-green-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
      primary: 'bg-primary-600',
      secondary: 'bg-gray-500',
      light: 'bg-gray-300',
      dark: 'bg-gray-900'
    };

    const bgClass = variant && variantClasses[variant] ? variantClasses[variant] : 'bg-blue-500';

    return classMerge(baseClasses, stripedClass, animatedClass, bgClass);
  });

  readonly textClasses = computed(() => {
    const baseClasses = 'text-xs font-medium';

    const variant = this.textTypeValue() as Variant | undefined;
    const variantClasses: Record<Variant, string> = {
      success: 'text-green-700 dark:text-green-300',
      info: 'text-blue-700 dark:text-blue-300',
      warning: 'text-yellow-700 dark:text-yellow-300',
      danger: 'text-red-700 dark:text-red-300',
      primary: 'text-primary-700 dark:text-primary-300',
      secondary: 'text-gray-700 dark:text-gray-300',
      light: 'text-gray-900 dark:text-gray-100',
      dark: 'text-gray-100 dark:text-gray-900'
    };

    const textClass = variant && variantClasses[variant] ? variantClasses[variant] : 'text-white';

    return classMerge(baseClasses, textClass);
  });
}

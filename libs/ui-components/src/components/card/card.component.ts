import { Component, computed, input } from '@angular/core';
import { classMerge } from '../../utils';

@Component({
  selector: 'ngt-card',
  templateUrl: './card.component.html'
})
export class NgtCard {
  readonly variant = input<'default' | 'bordered' | 'elevated'>('default');

  cardClasses = computed(() => {
    const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden';
    const variantClasses = {
      default: 'shadow-sm',
      bordered: 'border border-gray-200 dark:border-gray-700',
      elevated: 'shadow-lg'
    };
    return classMerge(baseClasses, variantClasses[this.variant()]);
  });
}


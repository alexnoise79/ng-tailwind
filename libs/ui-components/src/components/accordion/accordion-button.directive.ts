import { Directive, HostListener, inject, HostBinding } from '@angular/core';
import { NgtAccordionItem } from './accordion-item.directive';

@Directive({
  selector: '[ngtAccordionButton]',
  standalone: true
})
export class NgtAccordionButton {
  @HostBinding('class.w-full')
  get fullWidth(): boolean {
    return true;
  }

  @HostBinding('class.flex')
  get flex(): boolean {
    return true;
  }

  @HostBinding('class.items-center')
  get itemsCenter(): boolean {
    return true;
  }

  @HostBinding('class.justify-between')
  get justifyBetween(): boolean {
    return true;
  }

  @HostBinding('class.p-4')
  get padding(): boolean {
    return true;
  }

  @HostBinding('class.text-left')
  get textLeft(): boolean {
    return true;
  }

  @HostBinding('class.hover:bg-gray-50')
  get hoverBg(): boolean {
    return true;
  }

  @HostBinding('class.dark:hover:bg-gray-800')
  get darkHoverBg(): boolean {
    return true;
  }

  @HostBinding('class.focus:outline-none')
  get focusOutline(): boolean {
    return true;
  }

  @HostBinding('class.focus:ring-2')
  get focusRing(): boolean {
    return true;
  }

  @HostBinding('class.focus:ring-primary-500')
  get focusRingColor(): boolean {
    return true;
  }

  @HostBinding('class.focus:ring-inset')
  get focusRingInset(): boolean {
    return true;
  }

  @HostBinding('class.transition-colors')
  get transitionColors(): boolean {
    return true;
  }
  private accordionItem = inject(NgtAccordionItem, { optional: true });

  @HostBinding('id')
  get id(): string {
    return this.accordionItem?.buttonId() || '';
  }

  @HostBinding('attr.aria-expanded')
  get ariaExpanded(): boolean {
    return this.accordionItem?.isOpen() || false;
  }

  @HostBinding('attr.aria-controls')
  get ariaControls(): string {
    return this.accordionItem?.contentId() || '';
  }

  @HostBinding('type')
  get type(): string {
    return 'button';
  }

  @HostListener('click')
  onClick(): void {
    this.accordionItem?.toggle();
  }

  get isOpen(): boolean {
    return this.accordionItem?.isOpen() || false;
  }
}


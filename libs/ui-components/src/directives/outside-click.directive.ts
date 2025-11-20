import { Directive, ElementRef, HostListener, OnDestroy, inject, output } from '@angular/core';

@Directive({
  selector: '[uiOutsideClick]'
})
export class OutsideClickDirective implements OnDestroy {
  readonly uiOutsideClick = output<void>();

  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement): void {
    if (!this.elementRef.nativeElement.contains(target)) {
      // TODO: The 'emit' function requires a mandatory void argument
      this.uiOutsideClick.emit();
    }
  }

  ngOnDestroy(): void {
  }
}

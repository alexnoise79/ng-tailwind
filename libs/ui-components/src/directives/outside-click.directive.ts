import { Directive, ElementRef, EventEmitter, Output, HostListener, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[uiOutsideClick]',
  standalone: true
})
export class OutsideClickDirective implements OnDestroy {
  @Output() uiOutsideClick = new EventEmitter<void>();

  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement): void {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.uiOutsideClick.emit();
    }
  }

  ngOnDestroy(): void {
    this.uiOutsideClick.complete();
  }
}

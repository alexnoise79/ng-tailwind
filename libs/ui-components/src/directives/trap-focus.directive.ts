import { Directive, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

@Directive({
  selector: '[uiTrapFocus]'
})
export class TrapFocusDirective implements AfterViewInit, OnDestroy {
  private focusTrapFactory = inject(FocusTrapFactory);
  private elementRef = inject(ElementRef);
  private focusTrap: FocusTrap | null = null;

  ngAfterViewInit() {
    this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
    this.focusTrap.focusInitialElement();
  }

  ngOnDestroy() {
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}

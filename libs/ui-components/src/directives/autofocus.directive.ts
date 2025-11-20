import { Directive, ElementRef, AfterViewInit, inject, input } from '@angular/core';

@Directive({
  selector: '[uiAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly uiAutofocus = input<boolean | string>(true);

  ngAfterViewInit(): void {
    const uiAutofocus = this.uiAutofocus();
    if (uiAutofocus !== false && uiAutofocus !== 'false') {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 0);
    }
  }
}

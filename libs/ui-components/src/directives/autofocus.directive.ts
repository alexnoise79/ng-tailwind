import { Directive, ElementRef, AfterViewInit, Input, inject } from '@angular/core';

@Directive({
  selector: '[uiAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() uiAutofocus: boolean | string = true;

  ngAfterViewInit(): void {
    if (this.uiAutofocus !== false && this.uiAutofocus !== 'false') {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 0);
    }
  }
}

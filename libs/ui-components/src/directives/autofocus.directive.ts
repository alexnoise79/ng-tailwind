import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[uiAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input() uiAutofocus: boolean | string = true;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (this.uiAutofocus !== false && this.uiAutofocus !== 'false') {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 0);
    }
  }
}

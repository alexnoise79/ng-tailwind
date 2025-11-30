import { Directive, TemplateRef, input, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[ngtSlide]'
})
export class NgtSlide {
  readonly id = input.required<string>();
  readonly template = inject(TemplateRef);
}


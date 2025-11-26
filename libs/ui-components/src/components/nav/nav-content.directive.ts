import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[ngtNavContent]'
})
export class NgtNavContent {
  templateRef = inject(TemplateRef<unknown>);
}

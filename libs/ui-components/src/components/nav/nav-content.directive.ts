import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[ngtNavContent]',
  standalone: true
})
export class NgtNavContent {
  templateRef = inject(TemplateRef<unknown>);
}

import { Directive, TemplateRef, inject } from '@angular/core';
import { NgtNavItem } from './nav-item.directive';

@Directive({
  selector: '[ngtNavContent]',
  standalone: true
})
export class NgtNavContent {
  templateRef = inject(TemplateRef<any>);
  private navItem = inject(NgtNavItem, { optional: true });

  get itemId(): string | undefined {
    return this.navItem?.id;
  }
}

import { Directive, Input, ViewContainerRef, TemplateRef, inject, effect, OnInit, Injector, runInInjectionContext } from '@angular/core';
import { NgtNav } from './nav.directive';

@Directive({
  selector: '[ngtNavOutlet]',
  standalone: true
})
export class NgtNavOutlet implements OnInit {
  private viewContainer = inject(ViewContainerRef);
  private injector = inject(Injector);

  @Input({ required: true }) ngtNavOutlet!: NgtNav;

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const selectedId = this.ngtNavOutlet?.selectedId();
        if (selectedId) {
          this.updateContent(selectedId);
        }
      });
    });
  }

  private updateContent(selectedId: string): void {
    this.viewContainer.clear();

    const selectedItem = this.ngtNavOutlet.items().find(item => item.id === selectedId);
    if (selectedItem?.navContent) {
      this.viewContainer.createEmbeddedView(selectedItem.navContent.templateRef);
    }
  }
}

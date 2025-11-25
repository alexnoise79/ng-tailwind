import { Directive, signal, computed, input, output, effect, AfterContentInit, ContentChild, inject, OnInit, Injector, runInInjectionContext, ViewContainerRef, ComponentRef } from '@angular/core';
import { NgtNavLink } from './nav-link.directive';
import { NgtNavContent } from './nav-content.directive';
import { NgtNav } from './nav.directive';
import { ElementRef } from '@angular/core';
import { NgtNavItemLink } from './nav-item-link.component';

let navItemIdCounter = 0;

@Directive({
  selector: 'ngt-nav-item, [ngtNavItem]'
})
export class NgtNavItem implements AfterContentInit, OnInit {
  readonly disabled = input<boolean>(false);
  readonly label = input<string | null>(null);
  readonly routerLink = input<string | string[] | null>(null);

  activated = output<void>();

  @ContentChild(NgtNavLink) navLink?: NgtNavLink;
  @ContentChild(NgtNavContent) navContent?: NgtNavContent;

  private nav = inject(NgtNav, { optional: true, skipSelf: true });
  private elementRef = inject(ElementRef);
  private vcr = inject(ViewContainerRef);
  private injector = inject(Injector);
  private originalClasses = '';
  private linkComponentRef?: ComponentRef<NgtNavItemLink>;

  id: string;
  isActive = signal(false);

  constructor() {
    this.id = `nav-item-${navItemIdCounter++}`;

    // Emit activated event when item becomes active
    effect(() => {
      if (this.isActive()) {
        this.activated.emit();
      }
    });
  }

  ngOnInit(): void {
    // Store original classes
    const nativeEl = this.elementRef.nativeElement;
    this.originalClasses = nativeEl.className || '';

    // Use effect to reactively update classes
    if (this.nav) {
      runInInjectionContext(this.injector, () => {
        effect(() => {
          const navItemClasses = this.nav!.getNavItemClasses();
          nativeEl.className = `${this.originalClasses} ${navItemClasses}`.trim();
        });
      });
    }
  }

  ngAfterContentInit(): void {
    // If used as an element (<ngt-nav-item>) with label but no ngtNavLink child,
    // create a link component dynamically using Angular's component system
    const nativeEl = this.elementRef.nativeElement;
    const labelValue = this.label();

    if (labelValue && !this.navLink && nativeEl.tagName.toLowerCase() === 'ngt-nav-item') {
      // Create the link component dynamically first
      // This will insert it into the directive element
      this.linkComponentRef = this.vcr.createComponent(NgtNavItemLink);

      // Set nav and navItem references immediately
      const instance = this.linkComponentRef.instance;
      instance.navItem = this;
      instance.nav = this.nav || undefined;

      // Get the component's host element
      const componentHostElement = this.linkComponentRef.location.nativeElement;
      const parent = nativeEl.parentNode;

      // Move the component to replace the directive element
      if (parent) {
        // Remove the component from the directive element
        // It should be a child of nativeEl after createComponent
        if (componentHostElement.parentNode === nativeEl) {
          nativeEl.removeChild(componentHostElement);
        }

        // Insert the component where the directive element is (replacing it)
        parent.insertBefore(componentHostElement, nativeEl);

        // Remove all remaining children from directive element
        while (nativeEl.firstChild) {
          nativeEl.removeChild(nativeEl.firstChild);
        }

        // Now remove the directive element from DOM completely
        parent.removeChild(nativeEl);
      }

      // Set up reactive inputs using signals
      runInInjectionContext(this.injector, () => {
        effect(() => {
          if (this.linkComponentRef) {
            const currentLabel = this.label();
            if (currentLabel) {
              instance.label.set(currentLabel);
            }
            instance.routerLink.set(this.routerLink());
            instance.disabled.set(this.disabled());
            instance.isActive.set(this.isActive());
            instance.buttonId.set(this.buttonId());
            // Ensure nav reference is up to date
            instance.nav = this.nav || undefined;
          }
        });
      });
    }
  }

  buttonId = computed(() => `${this.id}-button`);
}

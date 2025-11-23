import { Directive, signal, computed, input, output, effect, AfterContentInit, ContentChild, inject, Renderer2, OnInit, Injector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { NgtNavLink } from './nav-link.directive';
import { NgtNavContent } from './nav-content.directive';
import { NgtNav } from './nav.directive';
import { ElementRef } from '@angular/core';

let navItemIdCounter = 0;

@Directive({
  selector: 'ngt-nav-item, [ngtNavItem]',
  standalone: true
})
export class NgtNavItem implements AfterContentInit, OnInit {
  readonly itemId = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly label = input<string | null>(null);
  readonly routerLink = input<string | string[] | null>(null);

  activated = output<void>();

  @ContentChild(NgtNavLink) navLink?: NgtNavLink;
  @ContentChild(NgtNavContent) navContent?: NgtNavContent;

  private nav = inject(NgtNav, { optional: true, skipSelf: true });
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private router = inject(Router, { optional: true });
  private injector = inject(Injector);
  private originalClasses = '';
  private createdLinkElement?: HTMLElement;

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
          this.renderer.setAttribute(nativeEl, 'class', `${this.originalClasses} ${navItemClasses}`.trim());
        });
      });
    }
  }

  ngAfterContentInit(): void {
    const itemIdValue = this.itemId();
    if (itemIdValue) {
      this.id = itemIdValue;
    }

    // If used as an element (<ngt-nav-item>) with label but no ngtNavLink child,
    // create a link element and apply nav-link behavior manually
    const nativeEl = this.elementRef.nativeElement;
    const labelValue = this.label();
    const routerLinkValue = this.routerLink();

    if (labelValue && !this.navLink && nativeEl.tagName.toLowerCase() === 'ngt-nav-item') {
      // Create link element (anchor if routerLink, button otherwise)
      const linkEl = routerLinkValue ? this.renderer.createElement('a') : this.renderer.createElement('button');

      this.createdLinkElement = linkEl;

      // Set attributes
      this.renderer.setAttribute(linkEl, 'id', this.buttonId());
      this.renderer.setAttribute(linkEl, 'type', routerLinkValue ? '' : 'button');
      if (routerLinkValue) {
        // For anchor, we'll handle navigation in click handler
      }

      // Set text content
      const text = this.renderer.createText(labelValue);
      this.renderer.appendChild(linkEl, text);

      // Add click handler
      this.renderer.listen(linkEl, 'click', (event: Event) => {
        this.handleLinkClick(event);
      });

      // Apply classes and attributes reactively
      runInInjectionContext(this.injector, () => {
        effect(() => {
          this.updateLinkElement(linkEl);
        });
      });

      // Clear existing content and add link
      this.renderer.setProperty(nativeEl, 'innerHTML', '');
      this.renderer.appendChild(nativeEl, linkEl);

      // Initial update
      this.updateLinkElement(linkEl);
    }
  }

  private updateLinkElement(linkEl: HTMLElement): void {
    if (!this.nav) return;

    // Apply classes
    const navClasses = this.nav.getNavButtonClasses(this);
    this.renderer.setAttribute(linkEl, 'class', navClasses);

    // Apply ARIA attributes
    this.renderer.setAttribute(linkEl, 'aria-selected', this.isActive() ? 'true' : 'false');
    this.renderer.setAttribute(linkEl, 'aria-disabled', this.disabled() ? 'true' : 'false');
    this.renderer.setAttribute(linkEl, 'tabindex', this.isActive() && !this.disabled() ? '0' : '-1');
    this.renderer.setAttribute(linkEl, 'role', 'tab');

    if (this.disabled()) {
      this.renderer.setAttribute(linkEl, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(linkEl, 'disabled');
    }
  }

  private handleLinkClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Handle routerLink if present
    const routerLinkValue = this.routerLink();
    if (routerLinkValue && this.router) {
      const linkValue = Array.isArray(routerLinkValue) ? routerLinkValue : [routerLinkValue];
      this.router.navigate(linkValue);
    }

    // Select this item
    if (this.nav) {
      this.nav.selectItem(this.id);
    }
  }

  buttonId = computed(() => `${this.id}-button`);
}

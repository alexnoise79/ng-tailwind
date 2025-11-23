import { Directive, HostListener, inject, ElementRef, HostBinding, Optional, SkipSelf, effect, Renderer2, OnInit, OnDestroy, EffectRef, Injector, runInInjectionContext } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgtNavItem } from './nav-item.directive';
import { NgtNav } from './nav.directive';

@Directive({
  selector: '[ngtNavLink]',
  standalone: true
})
export class NgtNavLink implements OnInit, OnDestroy {
  private navItem = inject(NgtNavItem, { optional: true });
  private nav = inject(NgtNav, { optional: true, skipSelf: true });
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private router = inject(Router, { optional: true });
  private injector = inject(Injector);
  private currentClasses = '';
  private effectRef?: EffectRef;

  ngOnInit(): void {
    // Store original classes
    const nativeEl = this.elementRef.nativeElement;
    this.currentClasses = nativeEl.className || '';

    // Use effect to reactively update classes
    if (this.nav && this.navItem) {
      // Watch for changes in active state and update classes
      runInInjectionContext(this.injector, () => {
        this.effectRef = effect(() => {
          // Track the active state signal
          const isActive = this.navItem!.isActive();
          const navClasses = this.nav!.getNavButtonClasses(this.navItem!);
          // Merge with original classes
          this.renderer.setAttribute(nativeEl, 'class', `${this.currentClasses} ${navClasses}`.trim());
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy();
  }

  @HostBinding('attr.id')
  get buttonId(): string {
    return this.navItem?.buttonId() || '';
  }

  @HostBinding('attr.aria-selected')
  get ariaSelected(): string | null {
    return this.navItem?.isActive() ? 'true' : null;
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled(): string | null {
    return this.navItem?.disabled() ? 'true' : null;
  }

  @HostBinding('attr.tabindex')
  get tabindex(): number {
    return this.navItem?.isActive() && !this.navItem?.disabled() ? 0 : -1;
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'tab';
  }

  @HostBinding('attr.disabled')
  get disabled(): boolean | null {
    return this.navItem?.disabled() ? true : null;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.navItem?.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Handle routerLink if nav-item has it
    const routerLink = this.navItem?.routerLink();
    if (routerLink && this.router) {
      const linkValue = Array.isArray(routerLink) ? routerLink : [routerLink];
      this.router.navigate(linkValue);
    }

    if (this.nav && this.navItem) {
      this.nav.selectItem(this.navItem.id);
    }
  }
}

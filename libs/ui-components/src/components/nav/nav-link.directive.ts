import { Directive, HostListener, inject, ElementRef, effect, Renderer2, OnInit, OnDestroy, EffectRef, Injector, runInInjectionContext, computed } from '@angular/core';
import { Router } from '@angular/router';
import { NgtNavItem } from './nav-item.directive';
import { NgtNav } from './nav.directive';

@Directive({
  selector: '[ngtNavLink]',
  host: {
    '[attr.id]': 'buttonId()',
    '[attr.aria-selected]': 'ariaSelected()',
    '[attr.aria-disabled]': 'ariaDisabled()',
    '[attr.tabindex]': 'tabindex()',
    '[attr.role]': '"tab"',
    '[attr.disabled]': 'disabled()'
  }
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

  buttonId!: ReturnType<typeof computed<string>>;
  ariaSelected!: ReturnType<typeof computed<string | null>>;
  ariaDisabled!: ReturnType<typeof computed<string | null>>;
  tabindex!: ReturnType<typeof computed<number>>;
  disabled!: ReturnType<typeof computed<boolean | null>>;

  constructor() {
    runInInjectionContext(this.injector, () => {
      this.buttonId = computed(() => this.navItem?.buttonId() || '');
      this.ariaSelected = computed(() => this.navItem?.isActive() ? 'true' : null);
      this.ariaDisabled = computed(() => this.navItem?.disabled() ? 'true' : null);
      this.tabindex = computed(() => this.navItem?.isActive() && !this.navItem?.disabled() ? 0 : -1);
      this.disabled = computed(() => this.navItem?.disabled() ? true : null);
    });
  }

  ngOnInit() {
    // Store original classes
    const nativeEl = this.elementRef.nativeElement;
    this.currentClasses = nativeEl.className || '';

    // Use effect to reactively update classes
    if (this.nav && this.navItem) {
      // Watch for changes in active state and update classes
      runInInjectionContext(this.injector, () => {
        this.effectRef = effect(() => {
          // Track the active state signal to trigger updates
          this.navItem!.isActive();
          const navClasses = this.nav!.getNavButtonClasses(this.navItem!);
          // Merge with original classes
          this.renderer.setAttribute(nativeEl, 'class', `${this.currentClasses} ${navClasses}`.trim());
        });
      });
    }
  }

  ngOnDestroy() {
    this.effectRef?.destroy();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
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

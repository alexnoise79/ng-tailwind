import { Component, Input, computed, effect, inject, Injector, runInInjectionContext, signal, OnInit, OnDestroy, EffectRef, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgtNavItem } from './nav-item.directive';
import { NgtNav } from './nav.directive';

@Component({
  selector: 'ngt-nav-item-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (routerLink(); as link) {
      <a [routerLink]="link" [id]="buttonId()" [class]="navClasses()" [attr.aria-selected]="isActive() ? 'true' : 'false'" [attr.aria-disabled]="disabled() ? 'true' : 'false'" [attr.tabindex]="isActive() && !disabled() ? '0' : '-1'" role="tab" (click)="handleClick($event)">
        {{ label() }}
      </a>
    } @else {
      <button [id]="buttonId()" [type]="'button'" [class]="navClasses()" [attr.aria-selected]="isActive() ? 'true' : 'false'" [attr.aria-disabled]="disabled() ? 'true' : 'false'" [attr.tabindex]="isActive() && !disabled() ? '0' : '-1'" [disabled]="disabled()" role="tab" (click)="handleClick($event)">
        {{ label() }}
      </button>
    }
  `
})
export class NgtNavItemLink implements OnInit, AfterViewInit, OnDestroy {
  @Input() label = signal('');
  @Input() routerLink = signal<string | string[] | null>(null);
  @Input() disabled = signal(false);
  @Input() isActive = signal(false);
  @Input() buttonId = signal('');
  @Input() navItem?: NgtNavItem;
  @Input() nav?: NgtNav;

  private injector = inject(Injector);
  private effectRef?: EffectRef;

  navClasses = computed(() => {
    const nav = this.nav;
    const navItem = this.navItem;
    if (!nav || !navItem) return '';

    // Access signals that getNavButtonClasses uses to ensure proper tracking
    // This ensures the computed recalculates when these signals change
    // The values are intentionally not used - we're accessing for reactivity tracking
    void nav.selectedId();
    void nav.style();
    void nav.orientation();
    void navItem.isActive();

    // Now call the method - it will use the signals we just accessed
    return nav.getNavButtonClasses(navItem);
  });

  ngOnInit(): void {
    // Update classes reactively when active state or nav changes
    // This runs after inputs are set
    runInInjectionContext(this.injector, () => {
      this.effectRef = effect(() => {
        // Track active state and nav to trigger class updates
        if (this.navItem) {
          this.navItem.isActive();
        }
        if (this.nav) {
          this.nav.selectedId();
          this.nav.style();
          this.nav.orientation();
        }
        // Access navClasses to ensure it's computed and tracked
        this.navClasses();
      });
    });
  }

  ngAfterViewInit(): void {
    // Sync router active state with nav component selection
    // This is now handled centrally by the nav component
    if (this.routerLink() && this.nav && this.navItem) {
      // Notify nav component about this routerLink item
      this.nav.registerRouterLinkItem(this.navItem.id, this.routerLink()!);
    }
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy();
  }

  handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Only select immediately if there's no routerLink
    // For routerLinks, selection will happen after navigation completes
    // via the NavigationEnd event handler in ngAfterViewInit
    if (!this.routerLink() && this.nav && this.navItem) {
      this.nav.selectItem(this.navItem.id);
    }
  }
}

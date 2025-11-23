import { Component, Input, computed, effect, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgtNavItem } from './nav-item.directive';
import { NgtNav } from './nav.directive';

@Component({
  selector: 'ngt-nav-item-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (routerLink(); as link) {
      <a
        [routerLink]="link"
        [id]="buttonId()"
        [class]="navClasses()"
        [attr.aria-selected]="isActive() ? 'true' : 'false'"
        [attr.aria-disabled]="disabled() ? 'true' : 'false'"
        [attr.tabindex]="isActive() && !disabled() ? '0' : '-1'"
        role="tab"
        (click)="handleClick($event)">
        {{ label() }}
      </a>
    } @else {
      <button
        [id]="buttonId()"
        [type]="'button'"
        [class]="navClasses()"
        [attr.aria-selected]="isActive() ? 'true' : 'false'"
        [attr.aria-disabled]="disabled() ? 'true' : 'false'"
        [attr.tabindex]="isActive() && !disabled() ? '0' : '-1'"
        [disabled]="disabled()"
        role="tab"
        (click)="handleClick($event)">
        {{ label() }}
      </button>
    }
  `
})
export class NgtNavItemLink {
  @Input() label = signal('');
  @Input() routerLink = signal<string | string[] | null>(null);
  @Input() disabled = signal(false);
  @Input() isActive = signal(false);
  @Input() buttonId = signal('');

  private navItem = inject(NgtNavItem, { optional: true });
  private nav = inject(NgtNav, { optional: true, skipSelf: true });
  private injector = inject(Injector);

  navClasses = computed(() => {
    if (!this.nav || !this.navItem) return '';
    return this.nav.getNavButtonClasses(this.navItem);
  });

  constructor() {
    // Update classes reactively when active state changes
    runInInjectionContext(this.injector, () => {
      effect(() => {
        // Track active state to trigger class updates
        this.isActive();
        this.navClasses();
      });
    });
  }

  handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Select this item
    if (this.nav && this.navItem) {
      this.nav.selectItem(this.navItem.id);
    }
  }
}


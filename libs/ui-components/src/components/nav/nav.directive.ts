import { Directive, ContentChildren, QueryList, AfterContentInit, signal, computed, input, ElementRef, inject, HostBinding, HostListener, Renderer2, OnInit, effect, Injector, runInInjectionContext } from '@angular/core';
import { NgtNavItem } from './nav-item.directive';

export type NavOrientation = 'horizontal' | 'vertical';
export type NavStyle = 'tabs' | 'pills' | 'underline';
export type NavAlign = 'start' | 'center' | 'end' | 'justified';

@Directive({
  selector: 'ngt-nav, [ngtNav]',
  exportAs: 'ngtNav',
  standalone: true
})
export class NgtNav implements AfterContentInit, OnInit {
  readonly orientation = input<NavOrientation>('horizontal');
  readonly style = input<NavStyle>('tabs');
  readonly align = input<NavAlign>('start');
  readonly activeId = input<string | null>(null);

  @ContentChildren(NgtNavItem) navItems!: QueryList<NgtNavItem>;

  items = signal<NgtNavItem[]>([]);
  selectedId = signal<string | null>(null);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private originalClasses = '';

  @HostBinding('attr.role')
  get role(): string {
    return 'tablist';
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.handleKeyDown(event);
  }

  ngOnInit(): void {
    // Store original classes
    const nativeEl = this.elementRef.nativeElement;
    this.originalClasses = nativeEl.className || '';

    // Use effect to reactively update classes
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const navClasses = this.navClasses();
        this.renderer.setAttribute(nativeEl, 'class', `${this.originalClasses} ${navClasses}`.trim());
      });
    });
  }

  ngAfterContentInit(): void {
    this.items.set(this.navItems.toArray());

    // Set initial active item if activeId is provided
    const activeIdValue = this.activeId();
    if (activeIdValue) {
      this.selectItem(activeIdValue);
    } else if (this.items().length > 0) {
      // Check if any nav item has routerLink - if so, don't auto-select
      // The router will handle active state via RouterLinkActive
      const hasRouterLink = this.items().some(item => item.routerLink() !== null);
      if (!hasRouterLink) {
        // Only auto-select first item if not using routerLink
        this.selectItem(this.items()[0].id);
      }
    }
  }

  selectItem(id: string): void {
    this.selectedId.set(id);
    this.items().forEach(item => {
      item.isActive.set(item.id === id);
    });
  }

  handleKeyDown(event: KeyboardEvent): void {
    const currentIndex = this.items().findIndex(item => item.id === this.selectedId());
    let newIndex = currentIndex;

    if (this.orientation() === 'horizontal') {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : this.items().length - 1;
          break;
        case 'ArrowRight':
          event.preventDefault();
          newIndex = currentIndex < this.items().length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = this.items().length - 1;
          break;
        default:
          return;
      }
    } else {
      // Vertical orientation
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : this.items().length - 1;
          break;
        case 'ArrowDown':
          event.preventDefault();
          newIndex = currentIndex < this.items().length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = this.items().length - 1;
          break;
        default:
          return;
      }
    }

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < this.items().length) {
      this.selectItem(this.items()[newIndex].id);
      // Focus the new nav item button
      const button = document.getElementById(this.items()[newIndex].buttonId());
      button?.focus();
    }
  }

  navClasses = computed(() => {
    const baseClasses = 'nav-list';
    const orientationClasses = {
      horizontal: 'flex flex-row',
      vertical: 'flex flex-col space-y-1'
    };
    const styleClasses = {
      tabs: this.orientation() === 'horizontal' ? 'border-b border-gray-200' : '',
      pills: '',
      underline: ''
    };
    const alignClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      justified: 'justify-between w-full'
    };

    let classes = `${baseClasses} ${orientationClasses[this.orientation()]} ${styleClasses[this.style()]}`;

    if (this.orientation() === 'horizontal') {
      classes += ` ${alignClasses[this.align()]}`;
    }

    return classes;
  });

  getNavButtonClasses(item: NgtNavItem): string {
    const baseClasses =
      this.orientation() === 'vertical' ? 'flex items-center justify-start font-medium text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed w-full' : 'inline-flex items-center justify-center font-medium text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const isActive = this.selectedId() === item.id;

    let classes = baseClasses;

    if (this.style() === 'tabs') {
      if (this.orientation() === 'horizontal') {
        classes += ' px-4 py-2 border-b-2';
        if (isActive) {
          classes += ' border-primary-600 text-primary-600';
        } else {
          classes += ' border-transparent text-gray-500 hover:text-gray-700';
        }
      } else {
        classes += ' px-4 py-2 border-r-2';
        if (isActive) {
          classes += ' border-primary-600 text-primary-600';
        } else {
          classes += ' border-transparent text-gray-500 hover:text-gray-700';
        }
      }
    } else if (this.style() === 'pills') {
      classes += ' px-4 py-2 rounded-md';
      if (isActive) {
        classes += ' bg-primary-600 text-white';
      } else {
        classes += ' text-gray-700 hover:bg-gray-100';
      }
    } else if (this.style() === 'underline') {
      classes += ' px-4 py-2 relative';
      if (isActive) {
        classes += ' text-primary-600';
        if (this.orientation() === 'horizontal') {
          classes += ' after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600';
        } else {
          classes += ' after:absolute after:top-0 after:bottom-0 after:left-0 after:w-0.5 after:bg-primary-600';
        }
      } else {
        classes += ' text-gray-500 hover:text-gray-700';
      }
    }

    return classes;
  }

  getNavItemClasses(): string {
    if (this.align() === 'justified' && this.orientation() === 'horizontal') {
      return 'flex-1';
    }
    return '';
  }
}

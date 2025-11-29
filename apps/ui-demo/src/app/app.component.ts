import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgtButton, NgtNav, NgtNavItem, NgtToastContainer, NgtToggleSwitch } from '@ngtailwind/ui-components';
import { ThemeConfiguratorComponent } from './components/theme-configurator/theme-configurator.component';
import { WINDOW } from '@universal/window.service';
import { LocalStorage } from '@universal/universal.providers';

interface NavItem {
  label: string;
  route: string;
}

interface NavGroup {
  name: string;
  items: Array<NavItem>;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, NgtButton, NgtNav, NgtNavItem, NgtToastContainer, NgtToggleSwitch, ThemeConfiguratorComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  isMobileMenuOpen = false;
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private window = inject(WINDOW);
  private localStorage = inject(LocalStorage);
  private routerSubscription?: Subscription;

  navigationGroups: Array<NavGroup> = [
    {
      name: 'Panel',
      items: [
        { label: 'Accordion', route: '/accordion' },
        { label: 'Card', route: '/card' },
        { label: 'Collapse', route: '/collapse' },
        { label: 'Nav', route: '/nav' }
      ]
    },
    {
      name: 'Overlay',
      items: [
        { label: 'Dropdown', route: '/dropdown' },
        { label: 'Modal', route: '/modal' },
        { label: 'Offcanvas', route: '/offcanvas' },
        { label: 'Tooltip', route: '/tooltip' }
      ]
    },
    {
      name: 'Form',
      items: [
        { label: 'Datepicker', route: '/datepicker' },
        { label: 'Input', route: '/input' },
        { label: 'Mobile Prefix', route: '/mobile-prefix' },
        { label: 'Password', route: '/password' },
        { label: 'Select', route: '/select' },
        { label: 'Timepicker', route: '/timepicker' },
        { label: 'Toggle Switch', route: '/toggle-switch' }
      ]
    },
    {
      name: 'Data',
      items: [
        { label: 'Pagination', route: '/pagination' },
        { label: 'Table', route: '/table' }
      ]
    },
    {
      name: 'Messages',
      items: [
        { label: 'Alert', route: '/alert' },
        { label: 'Toast', route: '/toast' }
      ]
    },
    {
      name: 'Buttons',
      items: [{ label: 'Button', route: '/button' }]
    }
  ];

  get sortedNavigationGroups(): Array<NavGroup> {
    return this.navigationGroups
      .map(group => ({
        ...group,
        items: [...group.items].sort((a, b) => a.label.localeCompare(b.label))
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  ngOnInit(): void {
    // Load saved preference or default to system preference
    const saved = this.localStorage.getItem('darkMode');
    if (saved !== null) {
      this.isDarkMode = saved === 'true';
    } else if (this.window) {
      this.isDarkMode = this.window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateTheme();

    // Set default theme if not already set
    if (!this.document.documentElement.getAttribute('data-theme')) {
      const savedTheme = this.localStorage.getItem('theme') || 'default';
      this.document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Close mobile menu on navigation
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe({
      next: () => {
        // Close menu if in mobile mode (screen width < 1024px, which is the lg breakpoint)
        if (this.window && this.window.innerWidth < 1024 && this.isMobileMenuOpen) {
          this.closeMobileMenu();
        }
      }
    });
  }

  onToggleChange(): void {
    this.updateTheme();
    this.localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll(): void {
    if (this.isMobileMenuOpen) {
      this.document.body.style.overflow = 'hidden';
    } else {
      this.document.body.style.overflow = '';
    }
  }

  ngOnDestroy(): void {
    // Restore body scroll on component destroy
    this.document.body.style.overflow = '';
    // Unsubscribe from router events
    this.routerSubscription?.unsubscribe();
  }

  private updateTheme(): void {
    if (this.isDarkMode) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }
}

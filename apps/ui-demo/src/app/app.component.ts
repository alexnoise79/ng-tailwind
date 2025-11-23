import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgtButton, NgtNav, NgtNavItem, NgtToastContainer, NgtToggleSwitch } from '@ng-tailwind/ui-components';
import { ThemeConfiguratorComponent } from './components/theme-configurator/theme-configurator.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, NgtButton, NgtNav, NgtNavItem, NgtToastContainer, NgtToggleSwitch, ThemeConfiguratorComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  isMobileMenuOpen = false;
  private router = inject(Router);
  private routerSubscription?: Subscription;

  ngOnInit(): void {
    // Load saved preference or default to system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      this.isDarkMode = saved === 'true';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateTheme();

    // Set default theme if not already set
    if (!document.documentElement.getAttribute('data-theme')) {
      const savedTheme = localStorage.getItem('theme') || 'default';
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Close mobile menu on navigation
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Close menu if in mobile mode (screen width < 1024px, which is the lg breakpoint)
        if (window.innerWidth < 1024 && this.isMobileMenuOpen) {
          this.closeMobileMenu();
        }
      });
  }

  onToggleChange(): void {
    this.updateTheme();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  ngOnDestroy(): void {
    // Restore body scroll on component destroy
    document.body.style.overflow = '';
    // Unsubscribe from router events
    this.routerSubscription?.unsubscribe();
  }

  private updateTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

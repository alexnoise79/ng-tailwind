import { Component, signal, OnInit, OnDestroy, AfterViewInit, ViewChild, effect } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ButtonComponent, NavComponent, NavItemComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, NavComponent, NavItemComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  activeRouteId = signal<string>('home');
  private routerSubscription?: Subscription;

  @ViewChild(NavComponent) navComponent?: NavComponent;

  constructor(private router: Router) {
    // Watch for activeRouteId changes and update nav selection
    effect(() => {
      const routeId = this.activeRouteId();
      // Use setTimeout to ensure ViewChild is available
      setTimeout(() => {
        if (this.navComponent) {
          this.navComponent.selectItem(routeId);
        }
      });
    });
  }

  ngOnInit(): void {
    // Set initial route
    const currentRoute = this.router.url.replace('/', '') || 'home';
    this.activeRouteId.set(currentRoute);

    // Update active route based on current URL
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const route = event.urlAfterRedirects.replace('/', '') || 'home';
        this.activeRouteId.set(route);
      });
  }

  ngAfterViewInit(): void {
    // Set initial selection after view is initialized
    const currentRoute = this.router.url.replace('/', '') || 'home';
    if (this.navComponent) {
      this.navComponent.selectItem(currentRoute);
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

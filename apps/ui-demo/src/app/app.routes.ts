import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full'
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./components/getting-started/getting-started.component').then(m => m.GettingStartedComponent)
  },
  {
    path: 'button',
    loadComponent: () => import('./components/button/button.component').then(m => m.ButtonDemoComponent)
  },
  {
    path: 'modal',
    loadComponent: () => import('./components/modal/modal.component').then(m => m.ModalDemoComponent)
  },
  {
    path: 'accordion',
    loadComponent: () => import('./components/accordion/accordion.component').then(m => m.AccordionDemoComponent)
  },
  {
    path: 'nav',
    loadComponent: () => import('./components/nav/nav.component').then(m => m.NavDemoComponent)
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./components/dropdown/dropdown.component').then(m => m.DropdownDemoComponent)
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./components/tooltip/tooltip.component').then(m => m.TooltipDemoComponent)
  },
  {
    path: 'collapse',
    loadComponent: () => import('./components/collapse/collapse.component').then(m => m.CollapseDemoComponent)
  },
  {
    path: 'datepicker',
    loadComponent: () => import('./components/datepicker/datepicker.component').then(m => m.DatepickerDemoComponent)
  },
  {
    path: 'offcanvas',
    loadComponent: () => import('./components/offcanvas/offcanvas.component').then(m => m.OffcanvasDemoComponent)
  },
  {
    path: 'pagination',
    loadComponent: () => import('./components/pagination/pagination.component').then(m => m.PaginationDemoComponent)
  },
  {
    path: 'toggle-switch',
    loadComponent: () => import('./components/toggle-switch/toggle-switch.component').then(m => m.ToggleSwitchDemoComponent)
  },
  {
    path: 'toast',
    loadComponent: () => import('./components/toast/toast.component').then(m => m.ToastDemoComponent)
  },
  {
    path: 'table',
    loadComponent: () => import('./components/table/table.component').then(m => m.TableDemoComponent)
  }
];

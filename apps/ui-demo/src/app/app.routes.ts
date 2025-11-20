import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
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
  }
];

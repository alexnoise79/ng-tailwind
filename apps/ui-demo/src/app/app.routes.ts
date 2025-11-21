import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full'
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./components/getting-started/getting-started.page').then(m => m.GettingStartedPage)
  },
  {
    path: 'button',
    loadComponent: () => import('./components/button/button.page').then(m => m.ButtonPage)
  },
  {
    path: 'modal',
    loadComponent: () => import('./components/modal/modal.page').then(m => m.ModalPage)
  },
  {
    path: 'accordion',
    loadComponent: () => import('./components/accordion/accordion.page').then(m => m.AccordionPage)
  },
  {
    path: 'nav',
    loadComponent: () => import('./components/nav/nav.page').then(m => m.NavPage)
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./components/dropdown/dropdown.page').then(m => m.DropdownPage)
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./components/tooltip/tooltip.page').then(m => m.TooltipPage)
  },
  {
    path: 'collapse',
    loadComponent: () => import('./components/collapse/collapse.page').then(m => m.CollapsePage)
  },
  {
    path: 'datepicker',
    loadComponent: () => import('./components/datepicker/datepicker.page').then(m => m.DatepickerPage)
  },
  {
    path: 'offcanvas',
    loadComponent: () => import('./components/offcanvas/offcanvas.page').then(m => m.OffcanvasPage)
  },
  {
    path: 'pagination',
    loadComponent: () => import('./components/pagination/pagination.page').then(m => m.PaginationPage)
  },
  {
    path: 'toggle-switch',
    loadComponent: () => import('./components/toggle-switch/toggle-switch.page').then(m => m.ToggleSwitchPage)
  },
  {
    path: 'toast',
    loadComponent: () => import('./components/toast/toast.page').then(m => m.ToastPage)
  },
  {
    path: 'table',
    loadComponent: () => import('./components/table/table.page').then(m => m.TablePage)
  },
  {
    path: 'select',
    loadComponent: () => import('./components/select/select.page').then(m => m.SelectPage)
  }
];

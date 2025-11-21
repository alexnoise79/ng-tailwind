import { Component, ViewChild, ViewContainerRef, AfterViewInit, inject } from '@angular/core';
import { NgtToastService } from './toast.service';

@Component({
  selector: 'ngt-toast-container',
  template: '<div #container class="toast-container-inner"></div>',
  styles: [
    `
      :host {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 28rem;
        width: 100%;
        pointer-events: none;
      }

      :host > div.toast-container-inner {
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
    `
  ]
})
export class NgtToastContainer implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) containerRef!: ViewContainerRef;

  private readonly toastService = inject(NgtToastService);

  ngAfterViewInit(): void {
    this.toastService.setContainer(this.containerRef);
  }
}

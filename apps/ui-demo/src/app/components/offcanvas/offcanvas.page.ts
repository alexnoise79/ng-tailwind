import { Component, signal } from '@angular/core';
import { NgtButton, NgtOffCanvas } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.offcanvas',
  imports: [NgtButton, NgtOffCanvas],
  templateUrl: './offcanvas.page.html'
})
export class OffcanvasPage {
  showStart = signal(false);
  showEnd = signal(false);
  showTop = signal(false);
  showBottom = signal(false);
  showWithBackdrop = signal(false);
  showWithoutBackdrop = signal(false);
  showWithTitle = signal(false);
}

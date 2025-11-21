import { Component, signal } from '@angular/core';
import { NgtButton, NgtModal } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.modal',
  imports: [NgtButton, NgtModal],
  templateUrl: './modal.page.html'
})
export class ModalPage {
  showModal = signal(false);
}


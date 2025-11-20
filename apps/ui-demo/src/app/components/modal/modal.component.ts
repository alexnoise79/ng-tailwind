import { Component, signal } from '@angular/core';
import { ButtonComponent, ModalComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.modal',
  imports: [ButtonComponent, ModalComponent],
  templateUrl: './modal.component.html'
})
export class ModalDemoComponent {
  showModal = signal(false);
}


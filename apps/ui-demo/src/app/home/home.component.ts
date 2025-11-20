import { Component, signal } from '@angular/core';
import { AccordionComponent, AccordionItemComponent, ButtonComponent, CollapseComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, ModalComponent, TabsComponent, TabComponent, TooltipComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, AccordionComponent, AccordionItemComponent, TabsComponent, TabComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, TooltipComponent, CollapseComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  showModal = signal(false);
  collapseOpen = signal(false);
  horizontalCollapseOpen = signal(false);
}

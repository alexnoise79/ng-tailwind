import { Component, signal } from '@angular/core';
import { AccordionComponent, AccordionItemComponent, ButtonComponent, CollapseComponent, DatepickerComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, ModalComponent, NgbDateStruct, TabsComponent, TabComponent, TooltipComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, ModalComponent, AccordionComponent, AccordionItemComponent, TabsComponent, TabComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, TooltipComponent, CollapseComponent, DatepickerComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  showModal = signal(false);
  collapseOpen = signal(false);
  horizontalCollapseOpen = signal(false);
  selectedDate = signal<NgbDateStruct | null>(null);
}

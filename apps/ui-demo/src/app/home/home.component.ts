import { Component, signal } from '@angular/core';
import { AccordionComponent, AccordionItemComponent, ButtonComponent, CollapseComponent, DatepickerComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, ModalComponent, NavComponent, NavItemComponent, NgtDateStruct, TabsComponent, TabComponent, TooltipComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, ModalComponent, AccordionComponent, AccordionItemComponent, TabsComponent, TabComponent, NavComponent, NavItemComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, TooltipComponent, CollapseComponent, DatepickerComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  showModal = signal(false);
  collapseOpen = signal(false);
  horizontalCollapseOpen = signal(false);
  selectedDate = signal<NgtDateStruct | null>(null);
}

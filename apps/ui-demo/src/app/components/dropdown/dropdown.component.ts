import { Component } from '@angular/core';
import { DropdownComponent, DropdownTriggerDirective, DropdownContentDirective } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.dropdown',
  imports: [DropdownComponent, DropdownTriggerDirective, DropdownContentDirective],
  templateUrl: './dropdown.component.html'
})
export class DropdownDemoComponent {}


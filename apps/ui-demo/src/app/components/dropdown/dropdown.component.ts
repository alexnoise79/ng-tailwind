import { Component } from '@angular/core';
import { NgtDropdown, NgtDropdownTrigger, NgtDropdownContent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.dropdown',
  imports: [NgtDropdown, NgtDropdownTrigger, NgtDropdownContent],
  templateUrl: './dropdown.component.html'
})
export class DropdownDemoComponent {}


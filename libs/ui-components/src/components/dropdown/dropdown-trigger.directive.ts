import { Directive, HostListener, inject } from '@angular/core';
import { NgtDropdown } from './dropdown.component';

@Directive({
  selector: '[ngt-dropdown-trigger]'
})
export class NgtDropdownTrigger {
  private dropdown = inject(NgtDropdown);

  @HostListener('click')
  onClick() {
    this.dropdown.toggle();
  }
}

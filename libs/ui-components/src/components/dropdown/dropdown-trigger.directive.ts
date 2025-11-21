import { Directive, HostListener, inject } from '@angular/core';
import { NgtDropdown } from './dropdown.component';

@Directive({
  selector: '[ngt-dropdown-trigger]'
})
export class NgtDropdownTrigger {
  private dropdown = inject(NgtDropdown);

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dropdown.toggle();
  }
}

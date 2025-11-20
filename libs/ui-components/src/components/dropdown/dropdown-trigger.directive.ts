import { Directive, HostListener, inject } from '@angular/core';
import { DropdownComponent } from './dropdown.component';

@Directive({
  selector: '[ui-dropdown-trigger]',
  standalone: true,
})
export class DropdownTriggerDirective {
  private dropdown = inject(DropdownComponent);

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dropdown.toggle();
  }
}


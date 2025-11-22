import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngtAccordionBody]',
  standalone: true
})
export class NgtAccordionBody {
  @HostBinding('class.p-4')
  get padding(): boolean {
    return true;
  }

  @HostBinding('class.text-gray-600')
  get textColor(): boolean {
    return true;
  }

  @HostBinding('class.dark:text-gray-300')
  get darkTextColor(): boolean {
    return true;
  }
}


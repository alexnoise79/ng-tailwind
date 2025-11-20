import { Component, signal } from '@angular/core';
import { DatepickerComponent, NgtDateStruct } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-datepicker',
  imports: [DatepickerComponent],
  templateUrl: './datepicker.component.html'
})
export class DatepickerDemoComponent {
  selectedDate = signal<NgtDateStruct | null>(null);
}


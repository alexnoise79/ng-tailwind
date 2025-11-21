import { Component, signal } from '@angular/core';
import { NgtDatepicker, NgtDateStruct } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.datepicker',
  imports: [NgtDatepicker],
  templateUrl: './datepicker.page.html'
})
export class DatepickerPage {
  selectedDate = signal<NgtDateStruct | null>(null);
}


import { Component, signal } from '@angular/core';
import { NgtPagination } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.pagination',
  imports: [NgtPagination],
  templateUrl: './pagination.page.html'
})
export class PaginationPage {
  currentPage1 = signal(1);
  currentPage2 = signal(1);
  currentPage3 = signal(5);
  currentPage4 = signal(1);
  currentPage5 = signal(50);
  currentPage6 = signal(1);
  currentPage7 = signal(1);
  currentPage8 = signal(1);

  Math = Math;

  onPageChange(page: number, signalName: string): void {
    console.log(`${signalName} changed to page:`, page);
  }
}

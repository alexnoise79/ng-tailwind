import { Component, signal } from '@angular/core';
import { AccordionComponent, AccordionItemComponent, ButtonComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, ModalComponent, TabsComponent, TabComponent, TooltipComponent } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, AccordionComponent, AccordionItemComponent, TabsComponent, TabComponent, DropdownComponent, DropdownTriggerDirective, DropdownContentDirective, TooltipComponent],
  template: `
    <div class="space-y-12">
      <section>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Getting Started</h2>
        <p class="text-gray-600 mb-4">Welcome to ng-tailwind UI Components - a modern Angular component library built with TailwindCSS and Angular CDK.</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Button</h2>
        <div class="flex flex-wrap gap-4">
          <ui-button variant="primary">Primary</ui-button>
          <ui-button variant="outline">Outline</ui-button>
          <ui-button variant="ghost">Ghost</ui-button>
          <ui-button variant="primary" size="sm">Small</ui-button>
          <ui-button variant="primary" size="md">Medium</ui-button>
          <ui-button variant="primary" size="lg">Large</ui-button>
          <ui-button variant="primary" [loading]="true">Loading</ui-button>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Modal</h2>
        <ui-button variant="primary" (click)="showModal.set(true)"> Open Modal </ui-button>
        @if (showModal()) {
          <ui-modal [isOpen]="showModal()" (close)="showModal.set(false)" title="Example Modal">
            <p class="text-gray-600 mb-4">This is a modal dialog built with Angular CDK Overlay.</p>
            <div class="flex justify-end gap-2">
              <ui-button variant="outline" (click)="showModal.set(false)"> Cancel </ui-button>
              <ui-button variant="primary" (click)="showModal.set(false)"> Confirm </ui-button>
            </div>
          </ui-modal>
        }
      </section>

      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Accordion</h2>
        <ui-accordion [multiOpen]="false">
          <ui-accordion-item title="First Item">
            <p class="text-gray-600">This is the content of the first accordion item.</p>
          </ui-accordion-item>
          <ui-accordion-item title="Second Item">
            <p class="text-gray-600">This is the content of the second accordion item.</p>
          </ui-accordion-item>
          <ui-accordion-item title="Third Item">
            <p class="text-gray-600">This is the content of the third accordion item.</p>
          </ui-accordion-item>
        </ui-accordion>
      </section>

      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tabs</h2>
        <ui-tabs>
          <ui-tab label="Tab 1">
            <p class="text-gray-600">Content for Tab 1</p>
          </ui-tab>
          <ui-tab label="Tab 2">
            <p class="text-gray-600">Content for Tab 2</p>
          </ui-tab>
          <ui-tab label="Tab 3">
            <p class="text-gray-600">Content for Tab 3</p>
          </ui-tab>
        </ui-tabs>
      </section>

      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Dropdown</h2>
        <ui-dropdown [align]="'left'">
          <button ui-dropdown-trigger class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Open Dropdown</button>
          <div ui-dropdown-content class="mt-2 w-48 bg-white rounded-md shadow-lg">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> Option 1 </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> Option 2 </a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> Option 3 </a>
          </div>
        </ui-dropdown>
      </section>

      <section>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Tooltip</h2>
        <div class="flex gap-4">
          <ui-tooltip text="This is a tooltip">
            <button class="px-4 py-2 bg-primary-600 text-white rounded-md">Hover me</button>
          </ui-tooltip>
          <ui-tooltip text="Another tooltip" position="bottom">
            <button class="px-4 py-2 bg-secondary-600 text-white rounded-md">Hover me too</button>
          </ui-tooltip>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  showModal = signal(false);
}

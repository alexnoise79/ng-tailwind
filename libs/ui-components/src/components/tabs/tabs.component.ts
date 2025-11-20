import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  signal,
  computed,
} from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [TabComponent],
  template: `
    <div class="tabs-container">
      <div
        role="tablist"
        class="flex border-b border-gray-200"
        (keydown)="handleKeyDown($event)"
      >
        @for (tab of tabs(); track tab.id) {
          <button
            type="button"
            [id]="tab.buttonId()"
            [attr.aria-selected]="activeTabId() === tab.id"
            [attr.aria-controls]="tab.panelId()"
            [attr.tabindex]="activeTabId() === tab.id ? 0 : -1"
            role="tab"
            class="px-4 py-2 font-medium text-sm border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            [class.border-primary-600]="activeTabId() === tab.id"
            [class.text-primary-600]="activeTabId() === tab.id"
            [class.border-transparent]="activeTabId() !== tab.id"
            [class.text-gray-500]="activeTabId() !== tab.id"
            [class.hover:text-gray-700]="activeTabId() !== tab.id"
            (click)="selectTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        }
      </div>
      <div class="tab-panels">
        <ng-content />
      </div>
    </div>
  `,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabComponents!: QueryList<TabComponent>;

  tabs = signal<TabComponent[]>([]);
  activeTabId = signal<string | null>(null);

  ngAfterContentInit(): void {
    this.tabs.set(this.tabComponents.toArray());
    if (this.tabs().length > 0 && !this.activeTabId()) {
      this.selectTab(this.tabs()[0].id);
    }
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
    this.tabs().forEach((tab) => {
      tab.isActive.set(tab.id === id);
    });
  }

  handleKeyDown(event: KeyboardEvent): void {
    const currentIndex = this.tabs().findIndex(
      (tab) => tab.id === this.activeTabId()
    );
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs().length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < this.tabs().length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = this.tabs().length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      this.selectTab(this.tabs()[newIndex].id);
      // Focus the new tab button
      const button = document.getElementById(this.tabs()[newIndex].buttonId());
      button?.focus();
    }
  }
}


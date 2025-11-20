import { Component, ContentChildren, QueryList, AfterContentInit, signal, computed } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'ui-tabs',
  imports: [],
  templateUrl: './tabs.component.html'
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
    this.tabs().forEach(tab => {
      tab.isActive.set(tab.id === id);
    });
  }

  handleKeyDown(event: KeyboardEvent): void {
    const currentIndex = this.tabs().findIndex(tab => tab.id === this.activeTabId());
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

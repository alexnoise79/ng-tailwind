import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  render: () => ({
    imports: [TabComponent],
    template: `
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
    `,
  }),
};

export const WithRichContent: Story = {
  render: () => ({
    imports: [TabComponent],
    template: `
      <ui-tabs>
        <ui-tab label="Overview">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Overview</h3>
            <p class="text-gray-600">
              This tab contains an overview of the content.
            </p>
          </div>
        </ui-tab>
        <ui-tab label="Details">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Details</h3>
            <p class="text-gray-600">
              This tab contains detailed information.
            </p>
          </div>
        </ui-tab>
        <ui-tab label="Settings">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Settings</h3>
            <p class="text-gray-600">
              This tab contains settings and configuration options.
            </p>
          </div>
        </ui-tab>
      </ui-tabs>
    `,
  }),
};


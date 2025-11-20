import type { Meta, StoryObj } from '@storybook/angular';
import { NavComponent } from './nav.component';
import { NavItemComponent } from './nav-item.component';

const meta: Meta<NavComponent> = {
  title: 'Components/Nav',
  component: NavComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<NavComponent>;

export const Default: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <ui-nav>
        <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
        <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
        <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
      </ui-nav>
    `
  })
};

export const Pills: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <ui-nav [style]="'pills'">
        <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
        <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
        <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
      </ui-nav>
    `
  })
};

export const Underline: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <ui-nav [style]="'underline'">
        <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
        <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
        <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
      </ui-nav>
    `
  })
};

export const CenterAligned: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <ui-nav [align]="'center'">
        <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
        <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
        <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
      </ui-nav>
    `
  })
};

export const Justified: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <ui-nav [align]="'justified'">
        <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
        <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
        <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
      </ui-nav>
    `
  })
};

export const Vertical: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <div class="max-w-xs">
        <ui-nav [orientation]="'vertical'">
          <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
          <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
          <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
        </ui-nav>
      </div>
    `
  })
};

export const WithDisabled: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <ui-nav>
        <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
        <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
        <ui-nav-item label="Disabled" [itemId]="'disabled'" [disabled]="true"></ui-nav-item>
        <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
      </ui-nav>
    `
  })
};

export const WithActiveId: Story = {
  render: () => ({
    imports: [NavItemComponent],
    template: `
      <ui-nav [activeId]="'about'">
        <ui-nav-item label="Home" [itemId]="'home'"></ui-nav-item>
        <ui-nav-item label="About" [itemId]="'about'"></ui-nav-item>
        <ui-nav-item label="Contact" [itemId]="'contact'"></ui-nav-item>
      </ui-nav>
    `
  })
};


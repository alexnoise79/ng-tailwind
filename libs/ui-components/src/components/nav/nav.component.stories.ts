import type { Meta, StoryObj } from '@storybook/angular';
import { NgtNav } from './nav.component';
import { NgtNavItem } from './nav-item.component';

const meta: Meta<NgtNav> = {
  title: 'Components/Nav',
  component: NgtNav,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<NgtNav>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtNav, NgtNavItem]
    },
    template: `
      <ngt-nav>
        <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
        <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
        <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
      </ngt-nav>
    `
  })
};

export const Pills: Story = {
  render: () => ({
    imports: [NgtNavItem],
    template: `
      <ngt-nav [style]="'pills'">
        <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
        <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
        <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
      </ngt-nav>
    `
  })
};

export const Underline: Story = {
  render: () => ({
    imports: [NgtNavItem],
    template: `
      <ngt-nav [style]="'underline'">
        <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
        <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
        <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
      </ngt-nav>
    `
  })
};

export const CenterAligned: Story = {
  render: () => ({
    imports: [NgtNavItem],
    template: `
      <ngt-nav [align]="'center'">
        <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
        <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
        <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
      </ngt-nav>
    `
  })
};

export const Justified: Story = {
  render: () => ({
    imports: [NgtNavItem],
    template: `
      <ngt-nav [align]="'justified'">
        <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
        <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
        <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
      </ngt-nav>
    `
  })
};

export const Vertical: Story = {
  render: () => ({
    imports: [NgtNavItem],
    template: `
      <div class="max-w-xs">
        <ngt-nav [orientation]="'vertical'">
          <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
          <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
          <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
        </ngt-nav>
      </div>
    `
  })
};

export const WithDisabled: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [NgtNav, NgtNavItem]
    },
    template: `
      <ngt-nav>
        <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
        <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
        <ngt-nav-item label="Disabled" [itemId]="'disabled'" [disabled]="true"></ngt-nav-item>
        <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
      </ngt-nav>
    `
  })
};

export const WithActiveId: Story = {
  render: () => ({
    imports: [NgtNavItem],
    template: `
      <ngt-nav [activeId]="'about'">
        <ngt-nav-item label="Home" [itemId]="'home'"></ngt-nav-item>
        <ngt-nav-item label="About" [itemId]="'about'"></ngt-nav-item>
        <ngt-nav-item label="Contact" [itemId]="'contact'"></ngt-nav-item>
      </ngt-nav>
    `
  })
};

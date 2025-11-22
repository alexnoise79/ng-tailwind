/// <reference types="vitest/globals" />
import { NgtAccordion } from './accordion.directive';
import { signal } from '@angular/core';

describe('NgtAccordion', () => {
  let component: NgtAccordion;

  beforeEach(() => {
    component = new NgtAccordion();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Single open mode (default)', () => {
    it('should have multiOpen set to false by default', () => {
      expect(component.multiOpen()).toBe(false);
    });

    it('should open only one item at a time', () => {
      const item1Id = 'accordion-item-0';
      const item2Id = 'accordion-item-1';

      // Open first item
      component.toggleItem(item1Id);
      expect(component.isItemOpen(item1Id)).toBe(true);
      expect(component.isItemOpen(item2Id)).toBe(false);

      // Open second item - first should close
      component.toggleItem(item2Id);
      expect(component.isItemOpen(item1Id)).toBe(false);
      expect(component.isItemOpen(item2Id)).toBe(true);
    });

    it('should close an item when clicking it again', () => {
      const itemId = 'accordion-item-0';

      // Open item
      component.toggleItem(itemId);
      expect(component.isItemOpen(itemId)).toBe(true);

      // Close item by clicking again
      component.toggleItem(itemId);
      expect(component.isItemOpen(itemId)).toBe(false);
    });
  });

  describe('Multi open mode', () => {
    beforeEach(() => {
      component.multiOpen = signal(true);
    });

    it('should allow multiple items to be open simultaneously', () => {
      const item1Id = 'accordion-item-0';
      const item2Id = 'accordion-item-1';
      const item3Id = 'accordion-item-2';

      // Open first item
      component.toggleItem(item1Id);
      expect(component.isItemOpen(item1Id)).toBe(true);
      expect(component.isItemOpen(item2Id)).toBe(false);
      expect(component.isItemOpen(item3Id)).toBe(false);

      // Open second item - first should remain open
      component.toggleItem(item2Id);
      expect(component.isItemOpen(item1Id)).toBe(true);
      expect(component.isItemOpen(item2Id)).toBe(true);
      expect(component.isItemOpen(item3Id)).toBe(false);

      // Open third item - first two should remain open
      component.toggleItem(item3Id);
      expect(component.isItemOpen(item1Id)).toBe(true);
      expect(component.isItemOpen(item2Id)).toBe(true);
      expect(component.isItemOpen(item3Id)).toBe(true);
    });

    it('should allow closing individual items without affecting others', () => {
      const item1Id = 'accordion-item-0';
      const item2Id = 'accordion-item-1';

      // Open both items
      component.toggleItem(item1Id);
      component.toggleItem(item2Id);
      expect(component.isItemOpen(item1Id)).toBe(true);
      expect(component.isItemOpen(item2Id)).toBe(true);

      // Close first item - second should remain open
      component.toggleItem(item1Id);
      expect(component.isItemOpen(item1Id)).toBe(false);
      expect(component.isItemOpen(item2Id)).toBe(true);
    });
  });

  describe('multiOpen input', () => {
    it('should accept boolean value', () => {
      component.multiOpen = false;
      expect(component.multiOpen()).toBe(false);

      component.multiOpen = true;
      expect(component.multiOpen()).toBe(true);
    });

    it('should accept WritableSignal value', () => {
      const multiOpenSignal = signal(true);
      component.multiOpen = multiOpenSignal;
      expect(component.multiOpen()).toBe(true);

      multiOpenSignal.set(false);
      expect(component.multiOpen()).toBe(false);
    });
  });

  describe('isItemOpen', () => {
    it('should return false for non-existent item', () => {
      expect(component.isItemOpen('non-existent-id')).toBe(false);
    });

    it('should return false for item that was never opened', () => {
      expect(component.isItemOpen('accordion-item-0')).toBe(false);
    });

    it('should return true for opened item', () => {
      const itemId = 'accordion-item-0';
      component.toggleItem(itemId);
      expect(component.isItemOpen(itemId)).toBe(true);
    });
  });
});

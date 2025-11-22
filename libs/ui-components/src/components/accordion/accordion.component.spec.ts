/// <reference types="vitest/globals" />
import { NgtAccordion } from './accordion.directive';
import { NgtAccordionItem } from './accordion-item.directive';
import { runInInjectionContext, Injector, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('NgtAccordion', () => {
  let component: NgtAccordion;
  let injector: Injector;
  let mockElementRef: Partial<ElementRef>;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: {} as HTMLElement
    };

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: mockElementRef }]
    });
    injector = TestBed.inject(Injector);

    component = runInInjectionContext(injector, () => {
      return new NgtAccordion();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Single open mode (default)', () => {
    it('should have multiOpen set to false by default', () => {
      expect(component.multiOpen()).toBe(false);
    });

    it('should open only one item at a time', () => {
      const item1Id = 'item-0';
      const item2Id = 'item-1';

      // Open first item
      component.toggleItem(item1Id);
      expect(component.openItems().has(item1Id)).toBe(true);
      expect(component.openItems().has(item2Id)).toBe(false);

      // Open second item - first should close
      component.toggleItem(item2Id);
      expect(component.openItems().has(item1Id)).toBe(false);
      expect(component.openItems().has(item2Id)).toBe(true);
    });

    it('should close an item when clicking it again', () => {
      const itemId = 'item-0';

      // Open item
      component.toggleItem(itemId);
      expect(component.openItems().has(itemId)).toBe(true);

      // Close item by clicking again
      component.toggleItem(itemId);
      expect(component.openItems().has(itemId)).toBe(false);
    });
  });

  describe('Multi open mode', () => {
    beforeEach(() => {
      // Set multiOpen to true by using the input directly
      (component as any).multiOpen = signal(true);
    });

    it('should allow multiple items to be open simultaneously', () => {
      const item1Id = 'item-0';
      const item2Id = 'item-1';
      const item3Id = 'item-2';

      // Open first item
      component.toggleItem(item1Id);
      expect(component.openItems().has(item1Id)).toBe(true);
      expect(component.openItems().has(item2Id)).toBe(false);
      expect(component.openItems().has(item3Id)).toBe(false);

      // Open second item - first should remain open
      component.toggleItem(item2Id);
      expect(component.openItems().has(item1Id)).toBe(true);
      expect(component.openItems().has(item2Id)).toBe(true);
      expect(component.openItems().has(item3Id)).toBe(false);

      // Open third item - first two should remain open
      component.toggleItem(item3Id);
      expect(component.openItems().has(item1Id)).toBe(true);
      expect(component.openItems().has(item2Id)).toBe(true);
      expect(component.openItems().has(item3Id)).toBe(true);
    });

    it('should allow closing individual items without affecting others', () => {
      const item1Id = 'item-0';
      const item2Id = 'item-1';

      // Open both items
      component.toggleItem(item1Id);
      component.toggleItem(item2Id);
      expect(component.openItems().has(item1Id)).toBe(true);
      expect(component.openItems().has(item2Id)).toBe(true);

      // Close first item - second should remain open
      component.toggleItem(item1Id);
      expect(component.openItems().has(item1Id)).toBe(false);
      expect(component.openItems().has(item2Id)).toBe(true);
    });
  });

  describe('multiOpen input', () => {
    it('should accept boolean value via input signal', () => {
      // Input signals are read-only and set via template binding in real usage
      // For testing, we can verify the default value
      expect(component.multiOpen()).toBe(false);
    });
  });

  describe('openItems', () => {
    it('should start with empty set', () => {
      expect(component.openItems().size).toBe(0);
    });

    it('should track opened items', () => {
      const itemId = 'item-0';
      component.toggleItem(itemId);
      expect(component.openItems().has(itemId)).toBe(true);
      expect(component.openItems().size).toBe(1);
    });
  });
});

describe('NgtAccordionItem', () => {
  let accordion: NgtAccordion;
  let item1: NgtAccordionItem;
  let item2: NgtAccordionItem;
  let injector: Injector;
  let mockElementRef: Partial<ElementRef>;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: {} as HTMLElement
    };

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: mockElementRef }]
    });
    injector = TestBed.inject(Injector);

    accordion = runInInjectionContext(injector, () => {
      const acc = new NgtAccordion();
      (acc as any).elementRef = mockElementRef;
      return acc;
    });

    // Reset the item counter for consistent IDs in tests
    // Note: In real usage, items get sequential IDs from the counter
    item1 = runInInjectionContext(injector, () => {
      const it = new NgtAccordionItem();
      // Inject the accordion into the item
      (it as any).accordion = accordion;
      return it;
    });

    item2 = runInInjectionContext(injector, () => {
      const it = new NgtAccordionItem();
      (it as any).accordion = accordion;
      return it;
    });
  });

  it('should create', () => {
    expect(item1).toBeTruthy();
  });

  describe('isOpen computed signal', () => {
    it('should return false for item that was never opened', () => {
      expect(item1.isOpen()).toBe(false);
    });

    it('should return true for opened item', () => {
      item1.toggle();
      expect(item1.isOpen()).toBe(true);
    });

    it('should reflect accordion state', () => {
      // Item 1 should be closed initially
      expect(item1.isOpen()).toBe(false);

      // Toggle item 1
      item1.toggle();
      expect(item1.isOpen()).toBe(true);

      // In single open mode, opening item 2 should close item 1
      item2.toggle();
      expect(item1.isOpen()).toBe(false);
      expect(item2.isOpen()).toBe(true);
    });
  });

  describe('toggle method', () => {
    it('should toggle item state', () => {
      expect(item1.isOpen()).toBe(false);

      item1.toggle();
      expect(item1.isOpen()).toBe(true);

      item1.toggle();
      expect(item1.isOpen()).toBe(false);
    });

    it('should not toggle when disabled', () => {
      (item1 as any).disabled = signal(true);
      expect(item1.isOpen()).toBe(false);

      item1.toggle();
      expect(item1.isOpen()).toBe(false);
    });
  });

  describe('disabled input', () => {
    it('should default to false', () => {
      expect(item1.disabled()).toBe(false);
    });
  });
});

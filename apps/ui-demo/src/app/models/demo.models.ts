/**
 * Demo models used across multiple demo pages
 */

/**
 * Tab type for demo pages with showcase and API tabs
 */
export type DemoTab = 'showcase' | 'api';

/**
 * City interface for select component demos
 */
export interface City {
  name: string;
  code: string;
  country?: string;
}

/**
 * Country interface for select component demos
 */
export interface Country {
  name: string;
  code: string;
}

/**
 * Product interface for table component demos
 */
export interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating?: number;
  inventoryStatus?: string;
}


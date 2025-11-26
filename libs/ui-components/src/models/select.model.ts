/**
 * Select option interface
 */
export interface SelectOption {
  label: string;
  value: unknown;
  group?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Select group interface for grouped options
 */
export interface SelectGroup {
  label: string;
  value: string;
  items: Array<SelectOption>;
}

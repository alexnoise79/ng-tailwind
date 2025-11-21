/**
 * Select option interface
 */
export interface SelectOption {
  label: string;
  value: any;
  group?: string;
  disabled?: boolean;
  [key: string]: any;
}

/**
 * Select group interface for grouped options
 */
export interface SelectGroup {
  label: string;
  value: string;
  items: SelectOption[];
}

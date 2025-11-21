import { SortOrder } from './sort.model';

/**
 * Table column configuration
 */
export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  frozen?: boolean;
  rowspan?: number;
  colspan?: number;
}

/**
 * Sort metadata for table sorting
 */
export interface SortMeta {
  field: string;
  order: SortOrder;
}

/**
 * Table row group configuration
 */
export interface TableRowGroup {
  field: string;
  header?: string;
  footer?: string;
}


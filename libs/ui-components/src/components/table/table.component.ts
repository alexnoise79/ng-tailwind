import {
  Component,
  ContentChild,
  TemplateRef,
  input,
  output,
  signal,
  computed,
  effect,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtPagination } from '../pagination/pagination.component';

export type TableSize = 'sm' | 'md' | 'lg';
export type SortOrder = 'asc' | 'desc' | null;

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  frozen?: boolean;
  rowspan?: number;
  colspan?: number;
}

export interface SortMeta {
  field: string;
  order: SortOrder;
}

export interface TableRowGroup {
  field: string;
  header?: string;
  footer?: string;
}

@Component({
  selector: 'ngt-table',
  standalone: true,
  imports: [CommonModule, NgtPagination],
  templateUrl: './table.component.html'
})
export class NgtTable implements AfterViewInit, OnDestroy {
  // Inputs
  readonly value = input<unknown[]>([]);
  readonly columns = input<TableColumn[]>([]);
  readonly size = input<TableSize>('md');
  readonly showGridlines = input<boolean>(false);
  readonly striped = input<boolean>(false);
  readonly paginator = input<boolean>(false);
  readonly rows = input<number>(10);
  readonly totalRecords = input<number | null>(null);
  readonly sortMode = input<'single' | 'multiple'>('single');
  readonly sortField = input<string | null>(null);
  readonly sortOrder = input<SortOrder>(null);
  readonly multiSortMeta = input<SortMeta[]>([]);
  readonly reorderableColumns = input<boolean>(false);
  readonly columnGroups = input<TableColumn[][]>([]);
  readonly rowGroupMode = input<'subheader' | 'rowspan' | null>(null);
  readonly groupRowsBy = input<string | null>(null);
  readonly scrollable = input<boolean>(false);
  readonly scrollHeight = input<string | null>(null);
  readonly tableStyle = input<Record<string, string>>({});

  // Outputs
  readonly sortChange = output<{ field: string; order: SortOrder }>();
  readonly pageChange = output<{ page: number; first: number; rows: number }>();
  readonly columnReorder = output<{ columns: TableColumn[]; dragIndex: number; dropIndex: number }>();

  // Template references
  @ContentChild('header') headerTemplate?: TemplateRef<{ $implicit: TableColumn[]; columns: TableColumn[] }>;
  @ContentChild('body') bodyTemplate?: TemplateRef<{ $implicit: unknown; rowIndex: number; columns: TableColumn[] }>;
  @ContentChild('footer') footerTemplate?: TemplateRef<{ $implicit: TableColumn[]; columns: TableColumn[] }>;
  @ContentChild('caption') captionTemplate?: TemplateRef<unknown>;
  @ContentChild('groupheader') groupHeaderTemplate?: TemplateRef<unknown>;
  @ContentChild('groupfooter') groupFooterTemplate?: TemplateRef<unknown>;
  @ContentChild('frozenheader') frozenHeaderTemplate?: TemplateRef<unknown>;
  @ContentChild('frozenbody') frozenBodyTemplate?: TemplateRef<unknown>;
  @ContentChild('frozenfooter') frozenFooterTemplate?: TemplateRef<unknown>;
  @ContentChild('loadingbody') loadingBodyTemplate?: TemplateRef<unknown>;
  @ContentChild('emptymessage') emptyMessageTemplate?: TemplateRef<unknown>;

  @ViewChild('tableElement') tableElement?: ElementRef<HTMLTableElement>;
  @ViewChild('thead') thead?: ElementRef<HTMLTableSectionElement>;

  // Internal state
  protected readonly _first = signal(0);
  protected readonly _currentPage = signal(1);
  protected readonly _sortField = signal<string | null>(null);
  protected readonly _sortOrder = signal<SortOrder>(null);
  protected readonly _multiSortMeta = signal<SortMeta[]>([]);
  protected readonly _columns = signal<TableColumn[]>([]);
  protected readonly _draggedColumnIndex = signal<number | null>(null);

  // Computed values
  readonly processedValue = computed(() => {
    const data = this.value();
    if (!this.paginator()) {
      return data;
    }
    const first = this._first();
    const rows = this.rows();
    return data.slice(first, first + rows);
  });

  readonly sortedValue = computed(() => {
    const data = this.processedValue();
    if (!this._sortField() && this._multiSortMeta().length === 0) {
      return data;
    }

    const sorted = [...data];
    if (this.sortMode() === 'multiple' && this._multiSortMeta().length > 0) {
      sorted.sort((a, b) => {
        for (const meta of this._multiSortMeta()) {
          const result = this.compare(a, b, meta.field, meta.order);
          if (result !== 0) return result;
        }
        return 0;
      });
    } else if (this._sortField()) {
      sorted.sort((a, b) => this.compare(a, b, this._sortField()!, this._sortOrder()));
    }
    return sorted;
  });

  readonly groupedValue = computed(() => {
    if (!this.rowGroupMode() || !this.groupRowsBy()) {
      return this.sortedValue();
    }
    // Grouping logic would go here
    return this.sortedValue();
  });

  readonly tableClasses = computed(() => {
    const baseClasses = 'w-full border-collapse';
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };
    const gridlineClasses = this.showGridlines() ? 'border border-gray-200 dark:border-gray-700' : '';
    return `${baseClasses} ${sizeClasses[this.size()]} ${gridlineClasses}`;
  });

  readonly theadClasses = computed(() => {
    return this.showGridlines() ? 'border-b border-gray-200 dark:border-gray-700' : '';
  });

  readonly tbodyClasses = computed(() => {
    return this.striped() ? 'divide-y divide-gray-200 dark:divide-gray-700' : '';
  });

  readonly thClasses = computed(() => {
    const baseClasses = 'px-4 py-3 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800';
    const sizeClasses = {
      sm: 'px-2 py-1.5 text-xs',
      md: 'px-4 py-3 text-sm',
      lg: 'px-6 py-4 text-base'
    };
    const gridlineClasses = this.showGridlines() ? 'border border-gray-200 dark:border-gray-700' : '';
    return `${baseClasses} ${sizeClasses[this.size()]} ${gridlineClasses}`;
  });

  readonly tdClasses = computed(() => {
    const baseClasses = 'px-4 py-3 text-gray-700 dark:text-gray-300';
    const sizeClasses = {
      sm: 'px-2 py-1.5 text-xs',
      md: 'px-4 py-3 text-sm',
      lg: 'px-6 py-4 text-base'
    };
    const gridlineClasses = this.showGridlines() ? 'border border-gray-200 dark:border-gray-700' : '';
    const stripedClasses = this.striped() ? 'even:bg-gray-50 dark:even:bg-gray-800/50' : '';
    return `${baseClasses} ${sizeClasses[this.size()]} ${gridlineClasses} ${stripedClasses}`;
  });

  readonly totalPages = computed(() => {
    const total = this.totalRecords() ?? this.value().length;
    const rows = this.rows();
    return Math.ceil(total / rows);
  });

  private dragListeners: (() => void)[] = [];

  constructor() {
    // Sync inputs with internal signals
    effect(() => {
      const columns = this.columns();
      if (columns.length > 0) {
        this._columns.set([...columns]);
      }
    });

    effect(() => {
      const sortField = this.sortField();
      if (sortField !== null) {
        this._sortField.set(sortField);
      }
    });

    effect(() => {
      const sortOrder = this.sortOrder();
      if (sortOrder !== null) {
        this._sortOrder.set(sortOrder);
      }
    });

    effect(() => {
      const multiSortMeta = this.multiSortMeta();
      if (multiSortMeta.length > 0) {
        this._multiSortMeta.set([...multiSortMeta]);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.reorderableColumns() && this.thead) {
      this.setupColumnReorder();
    }
  }

  ngOnDestroy(): void {
    this.dragListeners.forEach(cleanup => cleanup());
  }

  private setupColumnReorder(): void {
    if (!this.thead) return;

    const headerCells = this.thead.nativeElement.querySelectorAll('th[data-column-index]');
    headerCells.forEach((cell: Element, index: number) => {
      const htmlCell = cell as HTMLElement;
      if (!htmlCell.hasAttribute('data-sortable')) {
        htmlCell.setAttribute('draggable', 'true');
        htmlCell.style.cursor = 'move';

        const onDragStart = (e: DragEvent) => {
          this._draggedColumnIndex.set(index);
          e.dataTransfer!.effectAllowed = 'move';
          htmlCell.classList.add('opacity-50');
        };

        const onDragEnd = () => {
          this._draggedColumnIndex.set(null);
          htmlCell.classList.remove('opacity-50');
        };

        const onDragOver = (e: DragEvent) => {
          e.preventDefault();
          e.dataTransfer!.dropEffect = 'move';
        };

        const onDrop = (e: DragEvent) => {
          e.preventDefault();
          const dropIndex = parseInt((e.currentTarget as HTMLElement).getAttribute('data-column-index') || '0');
          const dragIndex = this._draggedColumnIndex();
          if (dragIndex !== null && dragIndex !== dropIndex) {
            this.reorderColumn(dragIndex, dropIndex);
          }
        };

        htmlCell.addEventListener('dragstart', onDragStart);
        htmlCell.addEventListener('dragend', onDragEnd);
        htmlCell.addEventListener('dragover', onDragOver);
        htmlCell.addEventListener('drop', onDrop);

        this.dragListeners.push(() => {
          htmlCell.removeEventListener('dragstart', onDragStart);
          htmlCell.removeEventListener('dragend', onDragEnd);
          htmlCell.removeEventListener('dragover', onDragOver);
          htmlCell.removeEventListener('drop', onDrop);
        });
      }
    });
  }

  sort(event: Event, field: string): void {
    event.preventDefault();
    const column = this._columns().find(col => col.field === field);
    if (!column || !column.sortable) return;

    let newOrder: SortOrder = 'asc';
    if (this.sortMode() === 'single') {
      if (this._sortField() === field) {
        if (this._sortOrder() === 'asc') {
          newOrder = 'desc';
        } else if (this._sortOrder() === 'desc') {
          newOrder = null;
        }
      }
      this._sortField.set(newOrder ? field : null);
      this._sortOrder.set(newOrder);
      this.sortChange.emit({ field: newOrder ? field : '', order: newOrder });
    } else {
      // Multiple sort mode
      const meta = [...this._multiSortMeta()];
      const existingIndex = meta.findIndex(m => m.field === field);
      if (existingIndex >= 0) {
        const existing = meta[existingIndex];
        if (existing.order === 'asc') {
          existing.order = 'desc';
        } else if (existing.order === 'desc') {
          meta.splice(existingIndex, 1);
        }
      } else {
        meta.push({ field, order: 'asc' });
      }
      this._multiSortMeta.set(meta);
      this.sortChange.emit({ field, order: meta.find(m => m.field === field)?.order || null });
    }
  }

  getSortIcon(field: string): string {
    if (this.sortMode() === 'single') {
      if (this._sortField() === field) {
        return this._sortOrder() === 'asc' ? '↑' : this._sortOrder() === 'desc' ? '↓' : '';
      }
      return '';
    } else {
      const meta = this._multiSortMeta().find(m => m.field === field);
      if (meta) {
        return meta.order === 'asc' ? '↑' : meta.order === 'desc' ? '↓' : '';
      }
      return '';
    }
  }

  isColumnSorted(field: string): boolean {
    if (this.sortMode() === 'single') {
      return this._sortField() === field && this._sortOrder() !== null;
    }
    return this._multiSortMeta().some(m => m.field === field);
  }

  private compare(a: unknown, b: unknown, field: string, order: SortOrder): number {
    if (!order) return 0;

    const aValue = this.resolveFieldDataInternal(a, field);
    const bValue = this.resolveFieldDataInternal(b, field);

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return order === 'asc' ? -1 : 1;
    if (bValue == null) return order === 'asc' ? 1 : -1;
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  }


  onPageChangeHandler(page: number): void {
    const rows = this.rows();
    const first = (page - 1) * rows;
    this._first.set(first);
    this._currentPage.set(page);
    this.pageChange.emit({ page, first, rows });
  }

  reorderColumn(dragIndex: number, dropIndex: number): void {
    const columns = [...this._columns()];
    const draggedColumn = columns[dragIndex];
    columns.splice(dragIndex, 1);
    columns.splice(dropIndex, 0, draggedColumn);
    this._columns.set(columns);
    this.columnReorder.emit({ columns, dragIndex, dropIndex });
  }

  getColumnStyle(column: TableColumn): Record<string, string> {
    const style: Record<string, string> = {};
    if (column.width) {
      style['width'] = column.width;
    }
    return style;
  }

  resolveFieldData(data: unknown, field: string): unknown {
    return this.resolveFieldDataInternal(data, field);
  }

  private resolveFieldDataInternal(data: unknown, field: string): unknown {
    if (!data || typeof data !== 'object') {
      return undefined;
    }
    const dataObj = data as Record<string, unknown>;
    return field.split('.').reduce<unknown>((obj, prop) => {
      if (obj && typeof obj === 'object' && prop in obj) {
        return (obj as Record<string, unknown>)[prop];
      }
      return undefined;
    }, dataObj);
  }
}


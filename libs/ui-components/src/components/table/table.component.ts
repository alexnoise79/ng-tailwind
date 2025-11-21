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
  AfterViewChecked,
  OnDestroy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NgtPagination } from '../pagination/pagination.component';
import { Size, SortOrder, TableColumn, SortMeta } from '../../models';

@Component({
  selector: 'ngt-table',
  standalone: true,
  imports: [NgTemplateOutlet, NgtPagination],
  templateUrl: './table.component.html'
})
export class NgtTable implements AfterViewInit, AfterViewChecked, OnDestroy {
  // Inputs
  readonly value = input<unknown[]>([]);
  readonly columns = input<TableColumn[]>([]);
  readonly size = input<Size>('md');
  readonly showGridlines = input<boolean>(false);
  readonly striped = input<boolean>(false);
  readonly stripedColumns = input<boolean>(false);
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
  @ContentChild('body') bodyTemplate?: TemplateRef<{ $implicit: unknown; rowIndex: number; columns: TableColumn[]; trClasses: string }>;
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
    const stripedColumnClasses = this.stripedColumns() ? 'even:bg-gray-50 dark:even:bg-gray-800/50' : '';
    return `${baseClasses} ${sizeClasses[this.size()]} ${gridlineClasses} ${stripedColumnClasses}`;
  });

  readonly trClasses = computed(() => {
    const stripedRowClasses = this.striped() ? 'even:bg-gray-50 dark:even:bg-gray-800/50' : '';
    return stripedRowClasses;
  });

  readonly totalPages = computed(() => {
    const total = this.totalRecords() ?? this.value().length;
    const rows = this.rows();
    return Math.ceil(total / rows);
  });

  private dragListeners: (() => void)[] = [];
  private isColumnReorderSetup = false;
  private lastReorderableState = false;
  private lastColumnsLength = 0;
  private hasLocalColumnReorder = false; // Track if columns have been reordered locally

  constructor() {
    // Sync inputs with internal signals - always create a new copy
    // But don't overwrite if columns have been reordered locally
    effect(() => {
      const columns = this.columns();
      // Only sync from input if columns haven't been locally reordered
      // or if the column count/fields have actually changed
      if (!this.hasLocalColumnReorder) {
        if (columns.length > 0) {
          // Create a deep copy to ensure each table instance has its own columns
          const currentColumns = this._columns();
          const columnsChanged = currentColumns.length !== columns.length ||
            columns.some((col, idx) => !currentColumns[idx] || currentColumns[idx].field !== col.field);
          
          if (columnsChanged) {
            this._columns.set(columns.map(col => ({ ...col })));
          }
        } else {
          this._columns.set([]);
        }
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
    // Column reorder setup is handled in ngAfterViewChecked to ensure DOM is ready
    // This method is required by the AfterViewInit interface
    if (this.reorderableColumns() && this.thead) {
      // Trigger initial check
      setTimeout(() => this.ngAfterViewChecked(), 0);
    }
  }

  ngAfterViewChecked(): void {
    const reorderable = this.reorderableColumns();
    const columnsLength = this._columns().length;
    
    // Only re-setup if state actually changed and we're not currently dragging
    const stateChanged = this.lastReorderableState !== reorderable || 
                         this.lastColumnsLength !== columnsLength;
    
    if (stateChanged && !this._draggedColumnIndex()) {
      if (reorderable && this.thead) {
        // Clean up existing listeners
        this.dragListeners.forEach(cleanup => cleanup());
        this.dragListeners = [];
        this.isColumnReorderSetup = false;
        
        // Setup column reorder
        setTimeout(() => {
          if (this.thead && this.reorderableColumns()) {
            this.setupColumnReorder();
            this.lastReorderableState = reorderable;
            this.lastColumnsLength = columnsLength;
          }
        }, 0);
      } else if (!reorderable && this.isColumnReorderSetup) {
        // Clean up if reorderable is disabled
        this.dragListeners.forEach(cleanup => cleanup());
        this.dragListeners = [];
        this.isColumnReorderSetup = false;
        this.lastReorderableState = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.dragListeners.forEach(cleanup => cleanup());
  }

  private setupColumnReorder(): void {
    if (!this.thead || !this.reorderableColumns()) {
      this.isColumnReorderSetup = false;
      return;
    }

    const headerCells = this.thead.nativeElement.querySelectorAll('th[data-column-index]');
    
    if (headerCells.length === 0) {
      // Retry after a short delay if cells aren't ready
      setTimeout(() => this.setupColumnReorder(), 50);
      return;
    }

    headerCells.forEach((cell: Element) => {
        const htmlCell = cell as HTMLElement;
        const columnIndex = parseInt(htmlCell.getAttribute('data-column-index') || '0');
        
        // Ensure draggable is set
        if (this.reorderableColumns()) {
          htmlCell.setAttribute('draggable', 'true');
        }

        const onDragStart = (e: DragEvent) => {
          e.stopPropagation();
          if (e.dataTransfer) {
            this._draggedColumnIndex.set(columnIndex);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', columnIndex.toString());
            htmlCell.classList.add('opacity-50', 'cursor-grabbing');
            // Prevent text selection during drag
            e.dataTransfer.setDragImage(htmlCell, 0, 0);
          }
        };

        const onDragEnd = () => {
          this._draggedColumnIndex.set(null);
          htmlCell.classList.remove('opacity-50', 'cursor-grabbing');
          // Remove drag-over class from all cells
          headerCells.forEach((c: Element) => {
            (c as HTMLElement).classList.remove('border-l-2', 'border-primary-500');
          });
        };

        const onDragOver = (e: DragEvent) => {
          e.preventDefault();
          if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
          }
          // Add visual indicator for drop target
          htmlCell.classList.add('border-l-2', 'border-primary-500');
        };

        const onDragLeave = () => {
          htmlCell.classList.remove('border-l-2', 'border-primary-500');
        };

        const onDrop = (e: DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const dropIndex = columnIndex;
          const dragIndex = this._draggedColumnIndex();
          if (dragIndex !== null && dragIndex !== dropIndex) {
            this.reorderColumn(dragIndex, dropIndex);
          }
          htmlCell.classList.remove('border-l-2', 'border-primary-500');
          // Reset dragged index after a short delay to allow visual feedback
          setTimeout(() => {
            this._draggedColumnIndex.set(null);
          }, 100);
        };

        htmlCell.addEventListener('dragstart', onDragStart);
        htmlCell.addEventListener('dragend', onDragEnd);
        htmlCell.addEventListener('dragover', onDragOver);
        htmlCell.addEventListener('dragleave', onDragLeave);
        htmlCell.addEventListener('drop', onDrop);

        this.dragListeners.push(() => {
          htmlCell.removeEventListener('dragstart', onDragStart);
          htmlCell.removeEventListener('dragend', onDragEnd);
          htmlCell.removeEventListener('dragover', onDragOver);
          htmlCell.removeEventListener('dragleave', onDragLeave);
          htmlCell.removeEventListener('drop', onDrop);
        });
      });
    
    this.isColumnReorderSetup = true;
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
    // Create a new array to avoid mutating the original
    const columns = [...this._columns()];
    const draggedColumn = { ...columns[dragIndex] }; // Deep copy the column object
    columns.splice(dragIndex, 1);
    columns.splice(dropIndex, 0, draggedColumn);
    // Mark that columns have been locally reordered
    this.hasLocalColumnReorder = true;
    // Update only this table instance's columns
    this._columns.set(columns);
    // Emit event with the new column order (but don't mutate the input)
    this.columnReorder.emit({ columns: columns.map(col => ({ ...col })), dragIndex, dropIndex });
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


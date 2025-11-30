import { Component, Input, signal, computed, input, output, OnInit, effect, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { classMerge } from '../../utils';
import { NgtTimepicker, NgtTimeStruct } from '../timepicker';
import { OutsideClickDirective } from '../../directives';
import { Size } from '../../models';

export interface NgtDateStruct {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export type DateInput = string | Date | NgtDateStruct | null | undefined;
export type DateFormat = 'iso' | 'iso-local' | 'date' | 'datetime';

@Component({
  selector: 'ngt-datepicker',
  imports: [NgtTimepicker, OutsideClickDirective],
  templateUrl: './datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgtDatepicker),
      multi: true
    }
  ]
})
export class NgtDatepicker implements OnInit, ControlValueAccessor {
  @Input() set model(value: DateInput) {
    this.writeValue(value);
  }
  private _model = signal<NgtDateStruct | null>(null);

  // ControlValueAccessor implementation
  private onChange = (_value: string | null) => {};
  protected onTouched = () => {};

  // Calendar visibility
  private _isOpen = signal(false);
  isOpen = computed(() => this._isOpen());

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  readonly disabled = input(false);
  readonly minDate = input<DateInput>(null);
  readonly maxDate = input<DateInput>(null);
  readonly startDate = input<DateInput>(null);
  readonly markDisabled = input<((date: NgtDateStruct) => boolean) | undefined>(undefined);
  readonly showTime = input(false);
  readonly format = input<DateFormat>('iso');
  readonly showIcon = input(false);
  readonly position = input<'top' | 'bottom'>('top');
  readonly hourStep = input(1);
  readonly minuteStep = input(1);
  readonly secondStep = input(1);
  readonly size = input<Size>('md');

  readonly dateSelect = output<string>();
  readonly navigate = output<{ current: { year: number; month: number }; prev: { year: number; month: number } }>();

  private _currentMonth = signal(new Date().getMonth() + 1);
  private _currentYear = signal(new Date().getFullYear());
  private _currentHour = signal(new Date().getHours());
  private _currentMinute = signal(new Date().getMinutes());
  private _currentSecond = signal(new Date().getSeconds());

  modelValue = computed(() => this._model());
  currentMonth = computed(() => this._currentMonth());
  currentYear = computed(() => this._currentYear());
  currentHour = computed(() => this._currentHour());
  currentMinute = computed(() => this._currentMinute());
  currentSecond = computed(() => this._currentSecond());

  currentTime = computed(() => ({
    hour: this.currentHour(),
    minute: this.currentMinute(),
    second: this.showTime() ? this.currentSecond() : undefined
  }));

  shouldShowTime = computed(() => {
    // Only show timepicker if showTime is true AND format supports time
    if (!this.showTime()) return false;
    const formatType = this.format();
    // 'date' format doesn't include time, so don't show timepicker
    return formatType !== 'date';
  });

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate years list (100 years range: 50 years before and 50 years after current year)
  availableYears = computed(() => {
    const currentYear = new Date().getFullYear();
    const years: Array<number> = [];
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i);
    }
    return years;
  });

  // Generate months list with index
  availableMonths = computed(() => {
    return this.monthNames.map((name, index) => ({ value: index + 1, name }));
  });

  private previousFormat: DateFormat | null = null;

  constructor() {
    // Watch for format changes and re-emit the date if one is selected
    effect(() => {
      const currentFormat = this.format();
      const model = this.modelValue();

      // Only emit if format changed and we have a selected date
      if (this.previousFormat !== null && this.previousFormat !== currentFormat && model) {
        const dateWithTime: NgtDateStruct = {
          ...model,
          hour: this.showTime() ? this.currentHour() : undefined,
          minute: this.showTime() ? this.currentMinute() : undefined,
          second: this.showTime() ? this.currentSecond() : undefined
        };
        this.dateSelect.emit(this.formatDateOutput(dateWithTime));
      }

      this.previousFormat = currentFormat;
    });
  }

  ngOnInit() {
    const startDate = this.parseDateInput(this.startDate());
    if (startDate) {
      this._currentMonth.set(startDate.month);
      this._currentYear.set(startDate.year);
      if (startDate.hour !== undefined) this._currentHour.set(startDate.hour);
      if (startDate.minute !== undefined) this._currentMinute.set(startDate.minute);
      if (startDate.second !== undefined) this._currentSecond.set(startDate.second);
    } else if (this.modelValue()) {
      const model = this.modelValue()!;
      this._currentMonth.set(model.month);
      this._currentYear.set(model.year);
      if (model.hour !== undefined) this._currentHour.set(model.hour);
      if (model.minute !== undefined) this._currentMinute.set(model.minute);
      if (model.second !== undefined) this._currentSecond.set(model.second);
    }
  }

  parseDateInput(value: DateInput): NgtDateStruct | null {
    if (!value) return null;

    // If it's already a NgtDateStruct
    if (typeof value === 'object' && 'year' in value && 'month' in value && 'day' in value) {
      return value as NgtDateStruct;
    }

    // If it's a Date object
    if (value instanceof Date) {
      return {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        day: value.getDate(),
        hour: value.getHours(),
        minute: value.getMinutes(),
        second: value.getSeconds()
      };
    }

    // If it's a string, try to parse it
    if (typeof value === 'string') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds()
        };
      }
    }

    return null;
  }

  formatDateOutput(date: NgtDateStruct): string {
    const formatType = this.format();
    const showTimeValue = this.showTime();

    if (formatType === 'date') {
      // YYYY-MM-DD format
      return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    }

    if (formatType === 'iso') {
      // ISO 8601 format (UTC)
      const hour = showTimeValue ? (date.hour ?? 0) : 0;
      const minute = showTimeValue ? (date.minute ?? 0) : 0;
      const second = showTimeValue ? (date.second ?? 0) : 0;
      const dateObj = new Date(Date.UTC(date.year, date.month - 1, date.day, hour, minute, second));
      return dateObj.toISOString();
    }

    if (formatType === 'iso-local') {
      // ISO 8601 format (local time)
      const hour = showTimeValue ? (date.hour ?? 0) : 0;
      const minute = showTimeValue ? (date.minute ?? 0) : 0;
      const second = showTimeValue ? (date.second ?? 0) : 0;
      const dateObj = new Date(date.year, date.month - 1, date.day, hour, minute, second);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const h = String(dateObj.getHours()).padStart(2, '0');
      const m = String(dateObj.getMinutes()).padStart(2, '0');
      const s = String(dateObj.getSeconds()).padStart(2, '0');
      return showTimeValue ? `${year}-${month}-${day}T${h}:${m}:${s}` : `${year}-${month}-${day}`;
    }

    // datetime format: YYYY-MM-DD HH:mm:ss
    const hour = showTimeValue ? (date.hour ?? 0) : 0;
    const minute = showTimeValue ? (date.minute ?? 0) : 0;
    const second = showTimeValue ? (date.second ?? 0) : 0;
    const dateStr = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    if (showTimeValue) {
      return `${dateStr} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    }
    return dateStr;
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  getFirstDayOfMonth(month: number, year: number): number {
    const firstDay = new Date(year, month - 1, 1).getDay();
    // Convert Sunday (0) to 7, and shift Monday to 0
    return firstDay === 0 ? 6 : firstDay - 1;
  }

  calendarDays = computed(() => {
    const month = this.currentMonth();
    const year = this.currentYear();
    const daysInMonth = this.getDaysInMonth(month, year);
    const firstDay = this.getFirstDayOfMonth(month, year);
    const days: Array<NgtDateStruct | null> = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ year, month, day });
    }

    return days;
  });

  isSelected(date: NgtDateStruct | null): boolean {
    if (!date || !this.modelValue()) return false;
    const model = this.modelValue()!;
    return date.year === model.year && date.month === model.month && date.day === model.day;
  }

  isToday(date: NgtDateStruct | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.year === today.getFullYear() && date.month === today.getMonth() + 1 && date.day === today.getDate();
  }

  isDisabled(date: NgtDateStruct | null): boolean {
    if (!date || this.disabled()) return true;

    // Check minDate
    const minDate = this.parseDateInput(this.minDate());
    if (minDate) {
      const dateValue = new Date(date.year, date.month - 1, date.day);
      const minValue = new Date(minDate.year, minDate.month - 1, minDate.day);
      if (dateValue < minValue) return true;
    }

    // Check maxDate
    const maxDate = this.parseDateInput(this.maxDate());
    if (maxDate) {
      const dateValue = new Date(date.year, date.month - 1, date.day);
      const maxValue = new Date(maxDate.year, maxDate.month - 1, maxDate.day);
      if (dateValue > maxValue) return true;
    }

    // Check custom markDisabled function
    const markDisabledFn = this.markDisabled();
    if (markDisabledFn) {
      const result = markDisabledFn(date);
      if (result === true) return true;
    }

    return false;
  }

  selectDate(date: NgtDateStruct) {
    if (this.isDisabled(date)) return;

    const dateWithTime: NgtDateStruct = {
      ...date,
      hour: this.showTime() ? this.currentHour() : undefined,
      minute: this.showTime() ? this.currentMinute() : undefined,
      second: this.showTime() ? this.currentSecond() : undefined
    };

    this._model.set(dateWithTime);
    const formattedDate = this.formatDateOutput(dateWithTime);
    this.dateSelect.emit(formattedDate);
    this.onChange(formattedDate);

    // Close calendar after selection
    this.closeCalendar();
  }

  onTimeChange(time: NgtTimeStruct) {
    this._currentHour.set(time.hour);
    this._currentMinute.set(time.minute);
    if (time.second !== undefined) {
      this._currentSecond.set(time.second);
    }
    this.emitDateIfSelected();
  }

  private emitDateIfSelected() {
    const model = this.modelValue();
    if (model) {
      const dateWithTime: NgtDateStruct = {
        ...model,
        hour: this.currentHour(),
        minute: this.currentMinute(),
        second: this.currentSecond()
      };
      this._model.set(dateWithTime);
      const formattedDate = this.formatDateOutput(dateWithTime);
      this.dateSelect.emit(formattedDate);
      this.onChange(formattedDate);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: DateInput) {
    const parsed = this.parseDateInput(value);
    if (parsed) {
      const currentModel = this._model();
      // Preserve current time when model is updated from dateSelect output (circular update)
      // Only update time if:
      // 1. There's no current model (initial load)
      // 2. The date part changed (year, month, or day) - in this case, reset time to parsed time
      const dateChanged = !currentModel || currentModel.year !== parsed.year || currentModel.month !== parsed.month || currentModel.day !== parsed.day;

      this._model.set(parsed);
      this._currentMonth.set(parsed.month);
      this._currentYear.set(parsed.year);

      // Only update time if date changed (new date selected) or if there's no current model
      // This prevents time from being reset when model is updated from our own dateSelect output
      if (dateChanged) {
        if (parsed.hour !== undefined) this._currentHour.set(parsed.hour);
        if (parsed.minute !== undefined) this._currentMinute.set(parsed.minute);
        if (parsed.second !== undefined) this._currentSecond.set(parsed.second);
      }
      // If date didn't change, preserve the current time signals (they're already correct)
    } else {
      this._model.set(null);
    }
  }

  registerOnChange(fn: (value: string | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean) {
    // This will be handled by the disabled input
    void _isDisabled; // Explicitly mark as intentionally unused
  }

  // Calendar visibility methods
  openCalendar() {
    if (!this.disabled()) {
      // Sync current month/year with model when opening calendar
      const model = this.modelValue();
      if (model) {
        this._currentMonth.set(model.month);
        this._currentYear.set(model.year);
      }
      this._isOpen.set(true);
    }
  }

  closeCalendar() {
    this._isOpen.set(false);
    this.onTouched();
  }

  toggleCalendar() {
    if (this.isOpen()) {
      this.closeCalendar();
    } else {
      this.openCalendar();
    }
  }

  onInputFocus() {
    if (!this.showIcon() && !this.disabled()) {
      this.openCalendar();
    }
    this.onTouched();
  }

  onIconClick() {
    if (!this.disabled()) {
      this.toggleCalendar();
    }
  }

  onOutsideClick() {
    this.closeCalendar();
  }

  // Get formatted date for display in input
  getFormattedDate(): string {
    const model = this.modelValue();
    if (!model) return '';
    return this.formatDateOutput(model);
  }

  previousMonth() {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();

    if (this.currentMonth() === 1) {
      this._currentMonth.set(12);
      this._currentYear.set(this.currentYear() - 1);
    } else {
      this._currentMonth.set(this.currentMonth() - 1);
    }

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  nextMonth() {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();

    if (this.currentMonth() === 12) {
      this._currentMonth.set(1);
      this._currentYear.set(this.currentYear() + 1);
    } else {
      this._currentMonth.set(this.currentMonth() + 1);
    }

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  previousYear() {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();
    this._currentYear.set(this.currentYear() - 1);

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  nextYear() {
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();
    this._currentYear.set(this.currentYear() + 1);

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  onYearChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newYear = parseInt(target.value, 10);
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();
    this._currentYear.set(newYear);

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  onMonthChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newMonth = parseInt(target.value, 10);
    const prevMonth = this.currentMonth();
    const prevYear = this.currentYear();
    this._currentMonth.set(newMonth);

    this.navigate.emit({
      current: { year: this.currentYear(), month: this.currentMonth() },
      prev: { year: prevYear, month: prevMonth }
    });
  }

  getDateClasses(date: NgtDateStruct | null): string {
    if (!date) return '';

    const size = this.size();
    const sizeClasses = {
      sm: 'w-7 h-7 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-11 h-11 text-sm'
    };

    const base = `${sizeClasses[size]} flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`;

    if (this.isDisabled(date)) {
      return classMerge(base, 'text-gray-300 dark:text-gray-600 cursor-not-allowed');
    }

    if (this.isSelected(date)) {
      return classMerge(base, 'bg-primary-600 text-white font-semibold hover:bg-primary-700');
    }

    if (this.isToday(date)) {
      return classMerge(base, 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/50');
    }

    return classMerge(base, 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700');
  }

  // Size-based spacing classes
  calendarPaddingClasses = computed(() => {
    const size = this.size();
    if (size === 'sm') return 'p-1 sm:p-2';
    if (size === 'lg') return 'p-2 sm:p-3';
    return 'p-1 sm:p-2'; // md
  });

  headerMarginClasses = computed(() => {
    const size = this.size();
    if (size === 'sm') return 'mb-2';
    if (size === 'lg') return 'mb-5';
    return 'mb-4'; // md
  });

  dayNamesMarginClasses = computed(() => {
    const size = this.size();
    if (size === 'sm') return 'mb-1';
    if (size === 'lg') return 'mb-2';
    return 'mb-2'; // md
  });

  timeSectionMarginClasses = computed(() => {
    const size = this.size();
    if (size === 'sm') return 'mt-2 pt-2';
    if (size === 'lg') return 'mt-4 pt-4';
    return 'mt-4 pt-4'; // md
  });

  dayNameCellClasses = computed(() => {
    const size = this.size();
    if (size === 'sm') return 'w-7 h-7 text-xs';
    if (size === 'lg') return 'w-11 h-11 text-xs';
    return 'w-10 h-10 text-xs'; // md
  });

  emptyCellClasses = computed(() => {
    const size = this.size();
    if (size === 'sm') return 'w-7 h-7';
    if (size === 'lg') return 'w-11 h-11';
    return 'w-10 h-10'; // md
  });
}

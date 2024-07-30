import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit,Output,EventEmitter,Input,OnChanges,SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { CUSTOM_DATE_FORMATS } from './custom-date-formats';
import { CustomDateAdapter } from './custom-date-adapter'; 
import { ChangeDetectorRef } from '@angular/core';

/** @title Datepicker with custom calendar header */
@Component({
  selector: 'datepicker-custom-header',
  templateUrl: './datepicker-custom-header.component.html', 
  standalone: true,
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerCustomHeaderExample implements OnInit , OnChanges {
  @Input() selectedDate: Date | null = null; 
  readonly exampleHeader = ExampleHeader;
  dateControl = new FormControl(new Date());
  @Output() dateSelected = new EventEmitter<string>();

  ngOnInit() {
    if (this.selectedDate) {
      this.dateControl.setValue(this.selectedDate, { emitEvent: false });
    }
  
    this.dateControl.valueChanges.subscribe(date => {
      if (date) {
        const selectedDate = this.formatDate(date); // Format date as DD-MM-YYYY
        console.log('Date sélectionnée :', selectedDate); 
        this.dateSelected.emit(selectedDate);
      }
    });
  }
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && this.selectedDate) {
      this.dateControl.setValue(this.selectedDate, { emitEvent: false });
    }
  }

 
  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}




/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: `
    .example-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .example-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }
  `,
  template: `
    <div class="example-header">
      <button mat-icon-button (click)="previousClicked('year')">
        <mat-icon>keyboard_double_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{ periodLabel | async }}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button mat-icon-button (click)="nextClicked('year')">
        <mat-icon>keyboard_double_arrow_right</mat-icon>
      </button>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();
  readonly periodLabel = new BehaviorSubject<string>('');

  constructor(
    private _calendar: MatCalendar<D>,
    @Inject(DateAdapter) private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats
  ) {
    _calendar.stateChanges
      .pipe(startWith(null), takeUntil(this._destroyed))
      .subscribe(() => {
        this.periodLabel.next(
          this._dateAdapter
            .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
            .toLocaleUpperCase()
        );
      });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }



  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
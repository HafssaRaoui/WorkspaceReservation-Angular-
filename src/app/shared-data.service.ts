import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedDateSubject = new ReplaySubject<Date>(1);
  currentSelectedDate = this.selectedDateSubject.asObservable();


  updateSelectedDate(date: Date) {
    this.selectedDateSubject.next(date);
  }
}
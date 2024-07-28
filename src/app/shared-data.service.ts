import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedDateSource = new BehaviorSubject<Date>(new Date());
  currentSelectedDate = this.selectedDateSource.asObservable();

  updateSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
  }
}
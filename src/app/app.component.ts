import { Component } from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component';
import { CommonModule } from '@angular/common';
import { BureauComponent } from './bureau/bureau.component';
import { PositionService } from './position.service';
import { OnInit } from '@angular/core';
import { Position } from './models/position.model';
import { DatepickerCustomHeaderExample } from './datepicker-custom-header/datepicker-custom-header.component';
import { Router, RouterModule,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [PlateauComponent, BureauComponent, CommonModule, DatepickerCustomHeaderExample, RouterModule],
  providers: [PositionService]
})
export class AppComponent implements OnInit {
  title = 'mon-app-angular';
  positions: Position[] = [];
  selectedDate: Date = new Date();
  showHeaderAndPicker: boolean = true;

  constructor(private positionService: PositionService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateHeaderVisibility(event.urlAfterRedirects); // Use urlAfterRedirects to ensure redirects are handled
    });
  }

  ngOnInit() {
    this.updateHeaderVisibility(this.router.url);

    // Extract date from URL
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    if (dateParam) {
      this.selectedDate = this.parseDate(dateParam);
    }
  }

  updateHeaderVisibility(url: string) {
    this.showHeaderAndPicker = !url.includes('/login');
    console.log('Updated URL:', url);
    console.log('Show header and picker:', this.showHeaderAndPicker);
  }


  fetchPositions() {
    console.log('Fetching positions...');
    this.positionService.getPositions().subscribe((datas) => {
      this.positions = datas;
    });
    this.onDateSelected(this.formatDate(this.selectedDate));
  }



  onDateSelected(date: string) {
    this.router.navigate(['/plateau'], { queryParams: { date } });
    this.selectedDate = this.parseDate(date);
  }

  previousDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.onDateSelected(this.formatDate(this.selectedDate));
  }

  nextDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.onDateSelected(this.formatDate(this.selectedDate));
  }


  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
  }



}
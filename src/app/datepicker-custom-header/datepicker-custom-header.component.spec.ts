import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerCustomHeaderExample } from './datepicker-custom-header.component';

describe('DatepickerCustomHeaderComponent', () => {
  let component: DatepickerCustomHeaderExample;
  let fixture: ComponentFixture<DatepickerCustomHeaderExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerCustomHeaderExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerCustomHeaderExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

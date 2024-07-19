import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerCustomHeaderComponent } from './datepicker-custom-header.component';

describe('DatepickerCustomHeaderComponent', () => {
  let component: DatepickerCustomHeaderComponent;
  let fixture: ComponentFixture<DatepickerCustomHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerCustomHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerCustomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

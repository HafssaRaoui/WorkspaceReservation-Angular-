import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  // Use the `override` keyword to indicate that this method is overriding the base class method
  override format(date: Date, displayFormat: string): string {
    // Apply your custom format logic here
    // Example: return the date in 'YYYY-MM-DD' format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Return the formatted date as 'DD-MM-YYYY'
    return `${year}-${month}-${day}`;
  }
}

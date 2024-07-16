import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { BureauComponent } from './bureau.component';

@NgModule({
  declarations: [BureauComponent],
  imports: [CommonModule], // Assurez-vous que CommonModule est importé ici
  exports: [BureauComponent]
})
export class BureauModule { }

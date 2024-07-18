import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { PlateauComponent } from './plateau.component';

@NgModule({
  declarations: [PlateauComponent],
  imports: [CommonModule], // Assurez-vous que CommonModule est importé ici
  exports: [PlateauComponent]
})
export class PlateauModule { }
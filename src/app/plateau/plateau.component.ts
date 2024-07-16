import { Component } from '@angular/core';
import { BureauComponent } from '../bureau/bureau.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css'],
  standalone:true,
  imports: [CommonModule, BureauComponent]
})
export class PlateauComponent {
  bureaux = [
    { plein: true },
    { plein: false },
    { plein: true },
    { plein: false },
    { plein: true },
    { plein: false },
    { plein: true }
  ];
}


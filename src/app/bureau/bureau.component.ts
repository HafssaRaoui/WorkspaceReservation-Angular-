import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.css'],
  standalone:true,
  imports: [CommonModule]
})
export class BureauComponent {
  @Input() plein: boolean = false; // Assurez-vous que `plein` est correctement initialisé

  // URL des images hébergées sur Internet
}
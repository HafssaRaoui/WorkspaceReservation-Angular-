import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BureauComponent } from '../bureau/bureau.component';
import { PositionService } from '../position.service';
import { Position } from '../models/position.model'; // Assurez-vous d'importer l'interface

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css'],
  standalone: true,
  imports: [CommonModule, BureauComponent]
})
export class PlateauComponent implements OnInit {
  bureaux: { plein: boolean }[] = [];

  constructor(private positionService: PositionService) {}

  ngOnInit() {
    this.positionService.getPositions().subscribe({
      next: (positions: Position[]) => {
        // Transformez les positions en bureaux
        this.bureaux = positions.map(position => ({
          plein: position.reservations && position.reservations.length > 0
        }));
        console.log('les positions : ', this.bureaux);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des positions :', error);
      }
    });
  }
}

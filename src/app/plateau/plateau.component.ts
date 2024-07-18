import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BureauComponent } from '../bureau/bureau.component';
import { PositionService } from '../position.service';
import { Position, Reservation } from '../models/position.model'; // Assurez-vous d'importer l'interface

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css'],
  standalone: true,
  imports: [CommonModule, BureauComponent]
})
export class PlateauComponent implements OnInit {
  bureaux: { plein: boolean, reservations: Reservation[] ,numero: string}[] = [];

  constructor(private positionService: PositionService) {}

  ngOnInit() {
    this.positionService.getPositions().subscribe({
      next: (positions: Position[]) => {
        console.log('Positions received:', positions);
        // Transformez les positions en bureaux avec les informations sur les réservations
        this.bureaux = positions.map(position => ({
          plein: position.reservations && position.reservations.length > 0,
          reservations: position.reservations || [], // Assurez-vous de gérer les cas où reservations est null
          numero: position.numero
        }));
        
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des positions :', error);
      }
    });
  }
}


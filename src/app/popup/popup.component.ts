import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PositionService } from '../position.service'; // Importez le service
import { CommonModule } from '@angular/common';
import './popup.component.css'; 

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PopupComponent implements OnInit {
  message: string = '';
  isReserved: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private positionService: PositionService // Injectez le service
  ) {}

  ngOnInit(): void {
    this.isReserved = this.data.reservations && this.data.reservations.length > 0;
    this.message = this.isReserved 
      ? `Est-ce que vous voulez libérer cette position?` 
      : `Est-ce que vous voulez réserver cette position?`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reserve(): void {
    // Logique pour réserver la position (envoyer une requête au backend si nécessaire)
    this.message = `Vous avez réservé la position : ${this.data.numero}`;
    // Ajouter ici la logique pour appeler le service pour la réservation
    // Exemple :
    // this.positionService.reservePosition(this.data.numero).subscribe(() => { /* Handle success */ });
  }

  release(): void {
    // Logique pour libérer la position (envoyer une requête au backend si nécessaire)
    this.message = `Vous avez libéré la position : ${this.data.numero}`;
    // Ajouter ici la logique pour appeler le service pour la libération
    // Exemple :
    // this.positionService.releasePosition(this.data.numero).subscribe(() => { /* Handle success */ });
  }
}


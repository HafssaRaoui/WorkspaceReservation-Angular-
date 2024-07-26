import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PositionService } from '../position.service';
import { CommonModule } from '@angular/common';
import { Reservation } from '../models/reservation.model'; // Assurez-vous que le chemin est correct
import { Position } from '../models/position.model';

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
  position!: Position; 
  positionId!: number;
  positionNumero!: string;

  
  userId: number = 2;
  firstName: string = 'Hafssa';
  lastName: string = 'Raoui';
  dialog: any;
  positiontionService: any;
  reservation: any;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private positionService: PositionService // Correctly inject the PositionService
  ) {}
  
  openDialog(position: any): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: position 
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Le dialogue a été fermé', result);
    });
  }

  ngOnInit(): void {
    this.position = this.data;
    this.isReserved = this.position.reservations && this.position.reservations.length > 0;
    this.message = this.isReserved 
      ? `Est-ce que vous voulez libérer cette position?` 
      : `Est-ce que vous voulez réserver cette position?`;
      this.positionNumero = this.position.numero; 
      this.positionId=this.position.id;
      console.log('positionNumero dans ngOnInit:', this.positionNumero);
      console.log('positionId dans ngOnInit:', this.positionId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reserve(): void {
    const reservation: Reservation = {
      dateDeb: new Date('2024-07-26T14:52:18'),
      dateFin: new Date('2024-07-27T14:52:18'),
      userId: this.userId,
      positionId: this.positionId, 
      positionNumero: this.positionNumero,
      firstName: this.firstName,
      lastName: this.lastName
    };
  
    console.log('Réservation envoyée:', reservation);
  
    if (this.positionService) {
      this.positionService.reservePosition(reservation).subscribe((response: any) => {
        console.log('Réservation réussie:', response);
        window.location.reload();
      }, (error: any) => {
        console.error('Erreur lors de la réservation:', error);
        if (error.error) {
          console.error('Détails de l\'erreur:', error.error);
        }
      });
    } else {
      console.error('Le service de réservation n\'est pas défini.');
    }
  }
  
}

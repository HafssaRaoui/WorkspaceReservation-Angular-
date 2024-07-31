import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PositionService } from '../position.service';
import { CommonModule } from '@angular/common';
import { Reservation } from '../models/reservation.model'; // Assurez-vous que le chemin est correct
import { Position } from '../models/position.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  selectedDate!: Date;
  
  userId!: number ;
  firstName!:string ;
  lastName!:string;
  dialog: any;
  positiontionService: any;
  reservation: any;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private positionService: PositionService, 
    private route: ActivatedRoute,
    private authService : AuthService
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
    this.selectedDate = new Date(this.data.currentDate);
    this.message = this.isReserved 
      ? `Est-ce que vous voulez libérer cette position?` 
      : `Est-ce que vous voulez réserver cette position?`;
      this.positionNumero = this.position.numero; 
      this.positionId=this.position.id;


      // Récupérer les détails de l'utilisateur authentifié
      const userDetails = this.authService.getUserDetails();
      this.userId = userDetails.userId;
      this.firstName = userDetails.firstName;
      this.lastName = userDetails.lastName;


      console.log('positionNumero dans ngOnInit:', this.positionNumero);
      console.log('positionId dans ngOnInit:', this.positionId);
      console.log('Date sélectionnée:', this.selectedDate);
      console.log('firstName dans ngOnInit:', this.firstName);
      console.log('lastName dans ngOnInit:', this.lastName);
      console.log('UserId:', this.userId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reserve(): void {
    const reservation: Reservation = {
      dateDeb: new Date(this.selectedDate),
      dateFin: new Date(this.selectedDate),
      userId: this.userId,
      positionId: this.positionId, 
      positionNumero: this.positionNumero,
      firstName: this.firstName,
      lastName: this.lastName
    };
    reservation.dateFin.setHours(23, 59, 59, 999);
    console.log('Réservation envoyée:', reservation);
  
    if (this.positionService) {
      this.positionService.reservePosition(reservation).subscribe((response: any) => {
        console.log('Réservation réussie:', response);
        window.location.reload();
        this.dialogRef.close({date: this.selectedDate, positionId: this.positionId});
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
  private formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  
}

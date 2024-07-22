import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BureauComponent } from '../bureau/bureau.component';
import { PositionService } from '../position.service';
import { Position, Reservation } from '../models/position.model'; // Assurez-vous d'importer l'interface
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css'],
  standalone: true,
  imports: [CommonModule, BureauComponent]
})
export class PlateauComponent implements OnInit {
  bureaux: { plein: boolean, reservations: Reservation[] ,numero: string}[] = [];
  selectedDate: string = this.formatDate(new Date());

  constructor(
    private positionService: PositionService,
    private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog
  ) {
    
  }

  ngOnInit() {
    // Fetch the selected date if available
    this.route.queryParams.subscribe(params => {
      const dateParam = params['date'];
      const dateToFetch = dateParam ? dateParam : this.formatDate(new Date());
      
      this.positionService.getPositions(dateToFetch).subscribe({
        next: (positions: Position[]) => {
          // Transformez les positions en bureaux
          this.bureaux = positions.map(position => ({
            plein: position.reservations && position.reservations.length > 0,reservations:position.reservations || [], numero :position.numero
          }));
          console.log('Les positions : ', this.bureaux);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des positions :', error);
        }
      });
    });
  }
  
  fetchPositions(date: string) {
    this.positionService.getPositions(date).subscribe({
      next: (positions: Position[]) => {
        console.log('Positions received:', positions);
        // Transformez les positions en bureaux avec les informations sur les réservations
        this.bureaux = positions.map(position => ({
          plein: position.reservations && position.reservations.length > 0,
          reservations: position.reservations || [], // Assurez-vous de gérer les cas où reservations est null
          numero: position.numero
        }));
        console.log('Les positions : ', this.bureaux);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des positions :', error);
      }
    });
  }
  openDialog(bureau: { plein: boolean, reservations: Reservation[] , numero: string }): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: {
        isReserved: bureau.plein,
        numero: bureau.numero,
        reservations: bureau.reservations
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialogue a été fermé');
    });
  }



  formatDate(date: Date): string {
    // Formattez la date comme DD-MM-YYYY
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
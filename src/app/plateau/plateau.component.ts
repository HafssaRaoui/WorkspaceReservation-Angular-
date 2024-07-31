import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BureauComponent } from '../bureau/bureau.component';
import { PositionService } from '../position.service';
import { Position } from '../models/position.model'; // Assurez-vous d'importer l'interface
import { Reservation } from '../models/reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ActivatedRoute,Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.css'],
  standalone: true,
  imports: [CommonModule, BureauComponent]
})
export class PlateauComponent implements OnInit {
  bureaux: { plein: boolean, reservations: Reservation[] ,numero: string,id: number,positions: Position[]}[] = [];
  selectedDate: Date = new Date();
  currentDate!: string;

  constructor(
    private positionService: PositionService,
    private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog,
    private sharedDataService: SharedDataService,
    private authService : AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    
  }

  ngOnInit() {
    console.log('Parent component initialized');
    console.log("Access Token in ngOnInit: ", this.authService.accessToken);
 
    this.route.queryParams.subscribe(params => {
      const dateParam = params['date'];
      this.selectedDate = dateParam ? new Date(dateParam) : new Date();
      this.sharedDataService.updateSelectedDate(this.selectedDate);
      const dateToFetch = this.formatDate(this.selectedDate);
      
      this.fetchPositions(dateToFetch);
      
      // this.positionService.getPositions(dateToFetch).subscribe({
      //   next: (positions: Position[]) => {
      //     // Transformez les positions en bureaux
      //     this.bureaux = positions.map(position => ({
      //       plein: position.reservations && position.reservations.length > 0,reservations:position.reservations || [], numero :position.numero,id: position.id
      //     }));
      //     console.log('Les positions : ', this.bureaux);
      //   },
      //   error: (error) => {
      //     console.error('Erreur lors de la récupération des positions :', error);
      //   }
      // });
    });
  }
  
  fetchPositions(date: string) {
    this.positionService.getPositions(date).subscribe({
      next: (positions: Position[]) => {
        console.log('Positions received:', positions);
        this.bureaux = positions.map(position => ({
          plein: position.reservations && position.reservations.length > 0,
          reservations: position.reservations || [], 
          numero: position.numero,
          id:position.id,
          positions: [position]
        }));
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des positions :', error);
      }
    });
  }
  openDialog(bureau: { plein: boolean, reservations: Reservation[] , numero: string, id: number }): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px',
      data: {
        isReserved: bureau.plein,
        numero: bureau.numero,
        reservations: bureau.reservations,
        id:bureau.id,
        currentDate: this.selectedDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const updatedBureau = this.bureaux.find(b => b.id === result.positionId);
        if (updatedBureau) {
          updatedBureau.plein = true;
          updatedBureau.reservations = updatedBureau.reservations || [];
          if (updatedBureau.reservations.length === 0) {
            updatedBureau.reservations.push({} as Reservation);
          }
        }

        this.changeDetectorRef.detectChanges();
        
       
        this.fetchPositions(this.formatDate(result.date));
      }
    });
  }



  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

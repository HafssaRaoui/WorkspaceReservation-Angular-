import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../models/reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component'
import { Position } from '../models/position.model';
import { PositionService } from '../position.service';
import { PlateauComponent } from '../plateau/plateau.component';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.css'],
  standalone:true,
  imports: [CommonModule,PlateauComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BureauComponent {
  @Input() plein: boolean = false; 
  @Input() reservations: Reservation[] = [];
  @Input() numero: string = '';
  @Input() id:number = 1;
  @Input() positions: Position[] = [];

  currentDate!: Date;




  // URL des images hébergées sur Internet
  pleinImageUrl: string="/images/full-office.png";
  videImageUrl: string="/images/empty-office.png";

  constructor(
    private positionService: PositionService,
    public dialog: MatDialog,
    private sharedDataService: SharedDataService
  ) {}
  ngOnInit(): void {
    this.sharedDataService.currentSelectedDate.subscribe(date => {
      this.currentDate = date;
    });
    //console.log(`Bureau component initialized: id=${this.id}`);
    // this.positionService.getPositions().subscribe(positions => {
    //   this.positions = positions;
    // });
  }


  getImageTitle(): string {
    if (this.reservations.length === 0) {
      return `Position: ${this.numero}`;
    } else {
      const reservation = this.reservations[0];
      return `Position: ${this.numero} \n Réservé par: ${reservation.firstName} ${reservation.lastName}`;
    }
  }
  openDialog(): void {
    this.dialog.open(PopupComponent, {
      width: '250px',
      data: { numero: this.numero, reservations: this.reservations, id:this.id,
        currentDate: this.currentDate 
       }
    });
  }
}

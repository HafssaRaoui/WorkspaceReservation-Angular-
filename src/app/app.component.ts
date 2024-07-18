import { Component } from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component';
import { CommonModule } from '@angular/common'; 
import { BureauComponent } from './bureau/bureau.component';
import { PositionService } from './position.service';
import { OnInit } from '@angular/core';
import { Position } from './models/position.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [PlateauComponent, BureauComponent, CommonModule],
  providers:[PositionService]
})
export class AppComponent implements OnInit {
  title = 'mon-app-angular';
  positions: Position[] = [];

  constructor(private positionService:PositionService){

  }
  ngOnInit(){
    console.log('On Init...')
    this.positionService.getPositions().subscribe((datas)=>{
      this.positions=datas;
    })
  }
}

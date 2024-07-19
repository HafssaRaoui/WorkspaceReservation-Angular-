import { Component } from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component';
import { CommonModule } from '@angular/common'; 
import { BureauComponent } from './bureau/bureau.component';
import { PositionService } from './position.service';
import { OnInit } from '@angular/core';
import { Position } from './models/position.model';
import { DatepickerCustomHeaderExample } from './datepicker-custom-header/datepicker-custom-header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [PlateauComponent, BureauComponent, CommonModule,DatepickerCustomHeaderExample],
  providers:[PositionService]
})
export class AppComponent implements OnInit {
  title = 'mon-app-angular';
  positions: Position[] = [];

  constructor(private positionService:PositionService, private router: Router){

  }
  
  ngOnInit(){

    
    
    console.log('On Init...')
    this.positionService.getPositions().subscribe((datas)=>{
      this.positions=datas;
    })
  }
  onDateSelected(date: string) {
    // Redirect to the plateau component with the selected date
    this.router.navigate(['/plateau'], { queryParams: { date } });
  }

}
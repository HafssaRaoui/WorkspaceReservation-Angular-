import { Component } from '@angular/core';
import { PlateauComponent } from './plateau/plateau.component'; // Ajoutez cet import
import { BureauComponent } from './bureau/bureau.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [PlateauComponent, BureauComponent]
})
export class AppComponent {
  title = 'mon-app-angular';
}

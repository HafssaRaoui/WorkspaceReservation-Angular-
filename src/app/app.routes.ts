import { Routes } from '@angular/router';
import { BureauComponent } from './bureau/bureau.component';
import { PlateauComponent } from './plateau/plateau.component';

export const appRoutes: Routes = [
  { path: '', component: PlateauComponent },
  { path: 'bureau', component: BureauComponent }
];

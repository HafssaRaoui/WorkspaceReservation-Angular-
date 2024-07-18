import { Routes } from '@angular/router';
import { BureauComponent } from './bureau/bureau.component';
import { PlateauComponent } from './plateau/plateau.component';

export const appRoutes: Routes = [
  { path: 'bureau', component: BureauComponent },
  { path: 'plateau', component: PlateauComponent },
  { path: '', redirectTo: '/bureau', pathMatch: 'full' }
];

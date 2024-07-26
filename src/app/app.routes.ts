import { Routes } from '@angular/router';
import { BureauComponent } from './bureau/bureau.component';
import { PlateauComponent } from './plateau/plateau.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'plateau', component: PlateauComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }


];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateauComponent } from './plateau/plateau.component';
import { BureauComponent } from './bureau/bureau.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  
  { path: 'bureau', component: BureauComponent },
  { path: 'plateau', component: PlateauComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

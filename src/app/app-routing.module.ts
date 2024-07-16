import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateauComponent } from './plateau/plateau.component';
import { BureauComponent } from './bureau/bureau.component';

const routes: Routes = [
  { path: '', component: PlateauComponent },
  { path: 'bureau', component: BureauComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

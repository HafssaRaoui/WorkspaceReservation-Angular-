import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BureauComponent } from './bureau/bureau.component';
import { PlateauComponent } from './plateau/plateau.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    PlateauComponent,
    BureauComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

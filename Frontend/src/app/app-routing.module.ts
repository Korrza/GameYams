import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './home/game/game.component';
import { PatriesListComponent } from './home/patries-list/patries-list.component';

const appRoutes: Routes = [
  { path: "home", component: GameComponent },
  { path: "statistics", component: PatriesListComponent },
  { path: "", pathMatch: "full", component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

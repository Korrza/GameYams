import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './home/auth-page/auth-page.component';
import { GameComponent } from './home/game/game.component';
import { PatriesListComponent } from './home/patries-list/patries-list.component';

const appRoutes: Routes = [
  { path: "home", component: GameComponent },
  { path: "statistics", component: PatriesListComponent },
  { path: "auth", pathMatch: "full", component: AuthPageComponent},
  { path: "", pathMatch: "full", component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

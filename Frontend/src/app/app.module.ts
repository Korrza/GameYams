import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './home/game/game.component';
import { HeaderComponent } from './home/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { PatriesListComponent } from './home/patries-list/patries-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HeaderComponent,
    PatriesListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

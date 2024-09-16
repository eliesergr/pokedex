import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { PokedexModule } from './pokedex/pokedex.module';
import { AppRoutingModule } from './app-routing.module';
import { PokedexRoutingModule } from './pokedex/pokedex-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PokedexModule,
    SharedModule,
    AppRoutingModule,
    PokedexRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

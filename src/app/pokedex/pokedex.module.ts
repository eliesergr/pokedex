import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PipesModule } from "../pipes/pipes.module";
import { PokedexRoutingModule } from './pokedex-routing.module';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent,
    PokemonComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    PokedexRoutingModule
],
  exports: [
    HomePageComponent,
  ]
})
export class PokedexModule { }

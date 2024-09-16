import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemons.interfaces';

@Component({
  selector: 'pokedex-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  constructor( private pokemonService: PokemonService ) {}

  ngOnInit(): void {
      
  }

  get getPokemons(): Pokemon[] {
    return this.pokemonService.pokemonList;
  }

}

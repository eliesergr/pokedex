import { Component } from '@angular/core';
import { PokemonService } from '../../../pokedex/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // private pokedexService
  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  get tags(): string[] {
    return this.pokemonService.tagsHistory;
  }

  searchTag( tag: string ):void {
    console.log("--tag: ",tag)
    this.pokemonService.searchTag( tag );
    this.router.navigate(['/pokemon', tag]);
  }

}

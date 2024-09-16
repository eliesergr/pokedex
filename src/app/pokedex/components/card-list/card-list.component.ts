import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemons.interfaces';
import { PokemonService } from '../../services/pokemon.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'pokedex-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  @Input()
  public pokemons: Pokemon[] = [];
  public pokemonsWithImages: any[] = []; 

  public previousDisabled = true;
  private forward = 0;
  private back = 0;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    // console.log("--pokemons : ", this.pokemons);
  
    const pokemonObservables = this.pokemons.map(pokemon => 
      this.pokemonService.getPokemonData(pokemon.name)
    );
  
    forkJoin(pokemonObservables).subscribe(pokemonDataArray => {
      this.pokemonsWithImages = this.pokemons.map((pokemon, index) => ({
        ...pokemon,  
        image: pokemonDataArray[index].sprites.other?.['official-artwork'].front_default || 'assets/default-image.png'  // Agregar la imagen
      }));
  
      // console.log("--this.pokemonsWithImages : ", this.pokemonsWithImages);
    });
  }

  onPrevious() {
    this.back = environment.PAGE_BREAK;
    this.pokemonService.previuosPage(this.back);

    if(localStorage.getItem('activePreviousButton') == '0') {
      this.previousDisabled = true;
    }
  }
  
  onNext() {
    this.forward = environment.PAGE_BREAK;
    this.pokemonService.nextPage(this.forward);

    localStorage.removeItem('activePreviousButton');
    this.previousDisabled = false;
  }

  loadPokemonData(pokemonName: string) {
    this.pokemonService.searchTag(pokemonName);
    this.router.navigate(['/pokemon', pokemonName]);
  }

}

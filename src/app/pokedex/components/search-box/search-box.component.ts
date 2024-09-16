import { Component, ElementRef, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Habilidades } from '../../interfaces/habilidades.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'pokedex-search-box',
  templateUrl: './search-box.component.html',
  // template: `
  //   <h5>Buscar:</h5>
  //   <input type="text"
  //     class="form-control"
  //     placeholder="Buscar pokedex..."
  //     (keyup.enter)="searchTag()"
  //     #txtTagInput
  //   >
  // `
})

export class SearchBoxComponent  {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

    animation: any          ;
    name: string        = '';
    atack: string       = '';
    defense: string     = '';
    mov: string         = '';
    abilities: any      = '';
    image: any          = null;
    description: any    = '';
    especie?:Habilidades    ;
    foundFlag: boolean  =false;
    text:string         ='';
  
  constructor( 
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute 
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.text = params['type'];
      
      this.pokemonService.getPokemonData(this.text)
        .pipe(
          catchError(error => {
            console.error("Error al obtener los datos del Pokémon: ", error);          
            return of(null); 
          })
        )
        .subscribe(
          pokemonData => {
            if (pokemonData) {
              console.log("-pokemonData: ", pokemonData);

              
            } else {
              console.log("No se pudo cargar la información del Pokémon.");
            }
          },
          err => {            
            console.error("Error en la suscripción: ", err);
          }
        );
    });
  }


  // searchTag( newTag: string ) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.pokemonService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonType, Species } from 'src/app/pokedex/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/pokedex/services/pokemon.service';

@Component({
  selector: 'shared-snavbar',
  templateUrl: './snavbar.component.html',
  styleUrls: ['./snavbar.component.css']
})
export class SnavbarComponent implements OnInit {

  typesList: { value: number, label: string }[] = [];
  translatedTypesList: { value: number, label: string }[] = []; 
  pokemonType: string = '';
  typeTranslations: { [key: string]: string } = {
    normal: 'Normal',
    fighting: 'Luchador',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada',
    stellar: 'Estelar',
    unknown: 'Desconocido'
  };

  constructor(private router: Router, private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    localStorage.removeItem('activePreviousButton');
    this.fetchPokemonTypes();
  }

  fetchPokemonTypes(): void {
    this.pokemonService.getPokemonTypes()
    .subscribe( resp => {
      console.log("---resp types: ",resp);
      this.typesList = resp.results.map( (type: any, index: number) => ({ 
        value: index + 1,
        label: type.name}));
        console.log('Pokemon Types:', this.typesList);
        
        this.translatedTypesList = this.typesList.map(type => ({
          value: type.value,
          label: this.typeTranslations[type.label] || type.label
        }));
        console.log('translatedTypesList:', this.translatedTypesList);
    });

  }

  search(value: string) {
    value = value.trim();
console.log("--en search ", value)
    if(value.length == 0) {
      return;
    } else {
      console.log("en navigate")
      this.router.navigate(['/search', value])
    }
  }

  onTypeSelected(event: any) {
    const selectedValue = event.target.value;
    console.log("selectedValue: ",selectedValue)
    if(selectedValue) {
      this.pokemonService.getPokemonByTypes(selectedValue);
    } else {
      this.pokemonService.throwRequest();
    }
    this.router.navigate(['/home'])
  }
}

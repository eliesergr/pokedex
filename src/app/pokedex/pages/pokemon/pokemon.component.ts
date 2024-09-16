import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Habilidades } from '../../interfaces/habilidades.interface';
import { forkJoin } from 'rxjs';
import { Species } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  animation: any;
  name: string = '';
  attack: number = 0;
  speed: number = 0;
  specialAttack: number = 0;
  defense: number = 0;
  moves: string[] = [];
  skills: string[] = [];
  abilities_desc: any = '';
  image: any = null;
  description: any = '';
  especie?: Habilidades;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta
    this.activatedRoute.paramMap.subscribe(params => {
      const name = params.get('name'); // Obtener el nombre del Pokémon de los parámetros de la URL
      if (name) {
        console.log("--name passed: ", name);
        this.loadPokemonData(name);
      }
    });
  }

  loadPokemonData(name: string): void {
    this.pokemonService.getPokemonData(name).subscribe(pokemon => {
      this.animation = pokemon.sprites.versions?.['generation-v']['black-white'].animated?.front_default;
      console.log("--pokemon: ", pokemon);
      this.name = pokemon.name;
      this.image = pokemon.sprites.other?.['official-artwork'].front_default;
      this.abilities_desc = pokemon.species;

      // Stats
      const defenseStat = pokemon.stats.find(stat => stat.stat.name === 'defense');
      this.defense = defenseStat ? defenseStat.base_stat : 0; 

      const attackStat = pokemon.stats.find(stat => stat.stat.name === 'attack');
      this.attack = attackStat ? attackStat.base_stat : 0;

      const specialAttackStat = pokemon.stats.find(stat => stat.stat.name === 'special-attack');
      this.specialAttack = specialAttackStat ? specialAttackStat.base_stat : 0;

      const speedStat = pokemon.stats.find(stat => stat.stat.name === 'speed');
      this.speed = speedStat ? speedStat.base_stat : 0;

      console.log('Ataque físico:', this.attack);
      console.log('Ataque especial:', this.specialAttack);
      console.log('Velocidad:', this.speed);

      // Movimientos
      const movesRequest = pokemon.moves.map((move) =>
        this.pokemonService.getPokemonMoveDetails(move.move.url)
      );
      forkJoin(movesRequest).subscribe((movesData: any[]) => {
        this.moves = movesData.map((moveDetail: any) => {
          const spanishName = moveDetail.names.find((name: any) => name.language.name === 'es');
          return spanishName ? spanishName.name : moveDetail.name;
        });
        console.log('Movimientos en español:', this.moves);
      });

      // Habilidades
      const abilitiesRequests = pokemon.abilities.map((ability: any) => 
        this.pokemonService.getPokemonAbilities(ability.ability.url)
      );
      forkJoin(abilitiesRequests).subscribe((abilitiesData: any) => {
        abilitiesData.forEach((abilityDetail: any) => {
          const spanishName = abilityDetail.names.find((name: any) => name.language.name === 'es');
          this.skills.push(spanishName.name);
          console.log("Habilidad en español: ", spanishName ? spanishName.name : 'No disponible en español');
        });
      });

      // Descripción y especie
      this.pokemonService.getAbilities(this.abilities_desc.url)
        .subscribe((resp: Habilidades) => {
          this.description = resp.flavor_text_entries.find(
            entry => entry.language.name === 'es'
          )?.flavor_text || '';

          this.especie = resp.genera.find(
            genus => genus.language.name === 'es'
          )?.genus;
        });
    });
  }
}

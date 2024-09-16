import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon, PokemonsResponse } from '../interfaces/pokemons.interfaces';
import { environment } from '../../../environments/environment';
import { PokemonData, Species } from '../interfaces/pokemon.interface';
import { catchError, Observable, of } from 'rxjs';
import { Habilidades } from '../interfaces/habilidades.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService {

  public pokemonList: Pokemon[] = [];
  // public pokemonData: PokemonData;

  private _tagsHistory: string[] = [];
  private apiKey:       string = '';
  private serviceUrl:   string = '';
  private limitPages:   number = environment.PAGE_BREAK;
  private offsetPage:   number = 0;
  private typeFlag: boolean    = false;
  private pokemonType:   string = '';

  constructor( private http: HttpClient ) {
    this.apiKey = environment.PokeAPI_KEY;
    this.serviceUrl = environment.SERVICE_URL;
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase(); 

    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }


  searchTag( tag: string ):void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    this.throwRequest()
  }

  getPokemonData(name: string):Observable<PokemonData> {
    return this.http.get<PokemonData>(`${ this.serviceUrl }/pokemon/${name}`);
  }

  throwRequest(): void {
    this.pokemonType = '';
    this.typeFlag = false;

    const params = this.getParams(); 
    // console.log("--params used throwRequest: ", params);
  
    this.http.get<PokemonsResponse>(`${this.serviceUrl}/pokemon`, { params })
      .pipe(
        catchError(error => {
          console.error('Error en Pokemon data:', error);
          return of({ results: [] });
        })
      )
      .subscribe(req => {
        try {
          this.pokemonList = req.results;
          // console.log("--req: ", req.results);
        } catch (error) {
          // console.error('Error procesando Pokemon data:', error);
        }
      });
  }

  getPokemonByTypes(nameType: string): void {
    this.pokemonType = nameType;

    this.typeFlag = true;
    const params = this.getParams(); 
    // console.log("--params used getPokemonByTypes: ", params); 
  
    this.http.get<any>(`${this.serviceUrl}/type/${nameType}`, { params })
      .pipe(
        catchError(error => {
          console.error('Error en Pokemon by type:', error);
          return of({ pokemon: [] }); 
        })
      )
      .subscribe(req => {
        try {
          this.pokemonList = req.pokemon.map((p: any) => ({
            name: p.pokemon.name,
            url: p.pokemon.url
          }));
  
          const offset = Number(params.get('offset')) || 0;  
          const limit = Number(params.get('limit')) || environment.PAGE_BREAK;  
  
          this.pokemonList = this.pokemonList.slice(offset, offset + limit);
          
          // console.log("--req by type (adaptado): ", this.pokemonList);
        } catch (error) {
          console.error('-Error procesando Pokemon list by type:', error);
        }
      });
  }
  

  getAbilities(url: string): Observable<Habilidades> {
    return this.http.get<Habilidades>(`${url}`);
  }

  getPokemonAbilities(url: string): Observable<Species> {
    return this.http.get<Species>(`${url}`);
  }

  getPokemonMoveDetails(url: string): Observable<Species> {
    return this.http.get<Species>(`${url}`);
  }
  
  getPokemonTypes(): Observable<any> {
    return this.http.get<any>(`${ this.serviceUrl }/type`)
  }

  getParams(): HttpParams {
    const params = new HttpParams()
    .set('limit', this.limitPages )
    .set('offset', this.offsetPage )

    return params;
  }

  nextPage(jump: number) {
    this.offsetPage = this.offsetPage + jump;
    if(!this.typeFlag) {
      this.throwRequest();
    } else {
      this.getPokemonByTypes(this.pokemonType);
    }
  }

  previuosPage(jump: number) {
    this.offsetPage = this.offsetPage - jump;
    if(this.offsetPage == 0) {
      localStorage.setItem('activePreviousButton','0');
    }
    if(!this.typeFlag) {
      this.throwRequest();
    } else {
      this.getPokemonByTypes(this.pokemonType);
    }
  }



}

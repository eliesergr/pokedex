import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'pokemon/:name',
    component: PokemonComponent
  },
  {
    path: 'search/:type',
    component: SearchBoxComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule { }

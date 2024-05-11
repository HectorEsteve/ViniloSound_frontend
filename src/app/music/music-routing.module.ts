import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicLayoutPageComponent } from './pages/layout/layout-page.component';
import { SongByNamePageComponent } from './pages/songs/song-by-name/song-by-name-page.component';
import { SongByBandPageComponent } from './pages/songs/song-by-band/song-by-band-page.component';
import { BandByNamePageComponent } from './pages/bands/band-by-name-page/band-by-name-page.component';
import { BandByGenrePageComponent } from './pages/bands/band-by-genre-page/band-by-genre-page.component';
import { VinylByNamePageComponent } from './pages/vinyls/vinyl-by-name/vinyl-by-name-page.component';
import { VinylByBandPageComponent } from './pages/vinyls/vinyl-by-band/vinyl-by-band-page.component';
import { VinylByGenrePageComponent } from './pages/vinyls/vinyl-by-genre/vinyl-by-genre-page.component';
import { CollectionByUserPageComponent } from './pages/collections/collection-by-user/collection-by-user-page.component';
import { CollectionByNamePageComponent } from './pages/collections/collection-by-name/collection-by-name-page.component';
import { CollectionByVinylPageComponent } from './pages/collections/collection-by-vinyl/collection-by-vinyl-page.component';
import { CollectionByBandPageComponent } from './pages/collections/collection-by-band/collection-by-band-page.component';

const routes: Routes = [
  {
    path: '',
    component: MusicLayoutPageComponent,
    children: [
      { path: 'songs/by-name', component:SongByNamePageComponent},
      { path: 'songs/by-band', component:SongByBandPageComponent},
      { path: 'bands/by-name', component:BandByNamePageComponent},
      { path: 'bands/by-genre', component:BandByGenrePageComponent},
      { path: 'vinyls/by-name', component:VinylByNamePageComponent},
      { path: 'vinyls/by-band', component:VinylByBandPageComponent},
      { path: 'vinyls/by-genre', component:VinylByGenrePageComponent},
      { path: 'collections/by-user', component:CollectionByUserPageComponent},
      { path: 'collections/by-name', component:CollectionByNamePageComponent},
      { path: 'collections/by-vinyl', component:CollectionByVinylPageComponent},
      { path: 'collections/by-band', component:CollectionByBandPageComponent},

      { path: '', redirectTo: 'vinyls/by-name', pathMatch: 'full' },
      { path: '**', redirectTo: 'vinyls/by-name', },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }

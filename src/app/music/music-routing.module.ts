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
import { SongByGenrePageComponent } from './pages/songs/song-by-genre-page/song-by-genre-page.component';
import { SongPageComponent } from './pages/songs/song-page/song-page.component';
import { GenrePageComponent } from './pages/genre/genre-page/genre-page.component';
import { BandPageComponent } from './pages/bands/band-page/band-page.component';
import { VinylPageComponent } from './pages/vinyls/vinyl-page/vinyl-page.component';
import { FormatPageComponent } from './pages/format/format-page/format-page.component';
import { RecordCompanyPageComponent } from './pages/record-company/record-company-page/record-company-page.component';

const routes: Routes = [
  {
    path: '',
    component: MusicLayoutPageComponent,
    children: [
      { path: 'genre/by/:id', component:GenrePageComponent},
      { path: 'format/by/:id', component:FormatPageComponent},
      { path: 'record-company/by/:id', component:RecordCompanyPageComponent},

      { path: 'songs/by-name', component:SongByNamePageComponent},
      { path: 'songs/by-band', component:SongByBandPageComponent},
      { path: 'songs/by-genre', component:SongByGenrePageComponent},
      { path: 'song/by/:id', component:SongPageComponent},

      { path: 'bands/by-name', component:BandByNamePageComponent},
      { path: 'bands/by-genre', component:BandByGenrePageComponent},
      { path: 'band/by/:id', component:BandPageComponent},

      { path: 'vinyls/by-name', component:VinylByNamePageComponent},
      { path: 'vinyls/by-band', component:VinylByBandPageComponent},
      { path: 'vinyls/by-genre', component:VinylByGenrePageComponent},
      { path: 'vinyl/by/:id', component:VinylPageComponent},

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

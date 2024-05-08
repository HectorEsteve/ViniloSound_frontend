import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicRoutingModule } from './music-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MusicSidebarComponent } from './components/sidebar/sidebar.component';

import { MusicLayoutPageComponent } from './pages/layout/layout-page.component';
import { SongByNamePageComponent } from './pages/songs/song-by-name/song-by-name-page.component';
import { SongByBandPageComponent } from './pages/songs/song-by-band/song-by-band-page.component';
import { SongByGenrePageComponent } from './pages/songs/song-by-genre/song-by-genre-page.component';
import { BandByNamePageComponent } from './pages/bands/band-by-name-page/band-by-name-page.component';
import { BandByGenrePageComponent } from './pages/bands/band-by-genre-page/band-by-genre-page.component';
import { VinylByNamePageComponent } from './pages/vinyls/vinyl-by-name/vinyl-by-name-page.component';
import { VinylByBandPageComponent } from './pages/vinyls/vinyl-by-band/vinyl-by-band-page.component';
import { VinylByGenrePageComponent } from './pages/vinyls/vinyl-by-genre/vinyl-by-genre-page.component';
import { CollectionByUserPageComponent } from './pages/collections/collection-by-user/collection-by-user-page.component';
import { CollectionByNamePageComponent } from './pages/collections/collection-by-name/collection-by-name-page.component';
import { CollectionByVinylPageComponent } from './pages/collections/collection-by-vinyl/collection-by-vinyl-page.component';
import { CollectionByBandPageComponent } from './pages/collections/collection-by-band/collection-by-band-page.component';


@NgModule({
  declarations: [
    MusicLayoutPageComponent,
    SongByNamePageComponent,
    SongByBandPageComponent,
    SongByGenrePageComponent,
    BandByNamePageComponent,
    BandByGenrePageComponent,
    VinylByNamePageComponent,
    VinylByBandPageComponent,
    VinylByGenrePageComponent,
    CollectionByUserPageComponent,
    CollectionByNamePageComponent,
    CollectionByVinylPageComponent,
    CollectionByBandPageComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MusicSidebarComponent

  ]
})
export class MusicModule { }

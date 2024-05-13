import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicRoutingModule } from './music-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MusicSidebarComponent } from './components/sidebar/sidebar.component';
import { SearchBoxComponent } from '../shared/components/searchBox/searchBox.component';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';
import { SongCardsComponent } from './components/song-card/song-cards.component';
import { SelectBoxComponent } from '../shared/components/selectBox/selectBox.component';
import { SongInfoComponent } from './components/song-info/song-info.component';
import { GenreInfoComponent } from './components/genre-info/genre-info.component';
import { BandCardComponent } from './components/band-card/band-card.component';
import { BandInfoComponent } from './components/band-info/band-info.component';

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

import { MinuteFormatPipe } from './pipe/minute-format.pipe';
import { StringToArrayPipe } from './pipe/string-to-array.pipe';





@NgModule({
  declarations: [
    MusicLayoutPageComponent,
    SongByNamePageComponent,
    SongByBandPageComponent,
    SongByGenrePageComponent,
    SongPageComponent,
    BandByNamePageComponent,
    BandByGenrePageComponent,
    VinylByNamePageComponent,
    VinylByBandPageComponent,
    VinylByGenrePageComponent,
    CollectionByUserPageComponent,
    CollectionByNamePageComponent,
    CollectionByVinylPageComponent,
    CollectionByBandPageComponent,
    GenrePageComponent,
    BandPageComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MusicSidebarComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent,
    SongCardsComponent,
    SelectBoxComponent,
    SongInfoComponent,
    GenreInfoComponent,
    MinuteFormatPipe,
    BandCardComponent,
    BandInfoComponent,
    StringToArrayPipe
  ]
})
export class MusicModule { }

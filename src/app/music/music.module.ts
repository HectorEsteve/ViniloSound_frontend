import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';

import { AuthRoutingModule }    from '../auth/auth-routing.module';
import { MusicRoutingModule }   from './music-routing.module';

import { BandCardComponent }          from './components/band-card/band-card.component';
import { BandInfoComponent }          from './components/band-info/band-info.component';
import { CollectionCardComponent }    from './components/collection-card/collection-card.component';
import { CollectionInfoComponent }    from './components/collection-info/collection-info.component';
import { FormatCardComponent }        from './components/format-card/format-card.component';
import { FormatInfoComponent }        from './components/format-info/format-info.component';
import { GenreCardComponent }         from './components/genre-card/genre-card.component';
import { GenreInfoComponent }         from './components/genre-info/genre-info.component';
import { LoadingSpinnerComponent }    from '../shared/components/loading-spinner/loading-spinner.component';
import { MusicSidebarComponent }      from './components/sidebar/sidebar.component';
import { RecordCompanyCardComponent } from './components/record-company-card/record-company-card.component';
import { RedordCompanyInfoComponent } from './components/redord-company-info/redord-company-info.component';
import { SearchBoxComponent }         from '../shared/components/searchBox/searchBox.component';
import { SelectBoxComponent }         from '../shared/components/selectBox/selectBox.component';
import { SongCardsComponent }         from './components/song-card/song-cards.component';
import { SongInfoComponent }          from './components/song-info/song-info.component';
import { VinylCardComponent }         from './components/vinyl-card/vinyl-card.component';
import { VinylInfoComponent }         from './components/vinyl-info/vinyl-info.component';

import { BandByGenrePageComponent }       from './pages/bands/band-by-genre-page/band-by-genre-page.component';
import { BandByNamePageComponent }        from './pages/bands/band-by-name-page/band-by-name-page.component';
import { BandPageComponent }              from './pages/bands/band-page/band-page.component';
import { CollectionByBandPageComponent }  from './pages/collections/collection-by-band/collection-by-band-page.component';
import { CollectionByNamePageComponent }  from './pages/collections/collection-by-name/collection-by-name-page.component';
import { CollectionByUserPageComponent }  from './pages/collections/collection-by-user/collection-by-user-page.component';
import { CollectionByVinylPageComponent } from './pages/collections/collection-by-vinyl/collection-by-vinyl-page.component';
import { CollectionPageComponent }        from './pages/collections/collection-page/collection-page.component';
import { FormatPageComponent }            from './pages/format/format-page/format-page.component';
import { GenrePageComponent }             from './pages/genre/genre-page/genre-page.component';
import { MusicLayoutPageComponent }       from './pages/layout/layout-page.component';
import { RecordCompanyPageComponent }     from './pages/record-company/record-company-page/record-company-page.component';
import { SongByBandPageComponent }        from './pages/songs/song-by-band/song-by-band-page.component';
import { SongByGenrePageComponent }       from './pages/songs/song-by-genre-page/song-by-genre-page.component';
import { SongByNamePageComponent }        from './pages/songs/song-by-name/song-by-name-page.component';
import { SongPageComponent }              from './pages/songs/song-page/song-page.component';
import { VinylByBandPageComponent }       from './pages/vinyls/vinyl-by-band/vinyl-by-band-page.component';
import { VinylByGenrePageComponent }      from './pages/vinyls/vinyl-by-genre/vinyl-by-genre-page.component';
import { VinylByNamePageComponent }       from './pages/vinyls/vinyl-by-name/vinyl-by-name-page.component';
import { VinylPageComponent }             from './pages/vinyls/vinyl-page/vinyl-page.component';

import { ArrayToStringPipe }  from './pipe/array-to-string.pipe';
import { MinuteFormatPipe }   from './pipe/minute-format.pipe';
import { StringToArrayPipe }  from './pipe/string-to-array.pipe';

@NgModule({
  declarations: [
    BandByGenrePageComponent,
    BandByNamePageComponent,
    BandPageComponent,
    CollectionByBandPageComponent,
    CollectionByNamePageComponent,
    CollectionByUserPageComponent,
    CollectionByVinylPageComponent,
    CollectionPageComponent,
    FormatPageComponent,
    GenrePageComponent,
    MusicLayoutPageComponent,
    RecordCompanyPageComponent,
    SongByBandPageComponent,
    SongByGenrePageComponent,
    SongByNamePageComponent,
    SongPageComponent,
    VinylByBandPageComponent,
    VinylByGenrePageComponent,
    VinylByNamePageComponent,
    VinylPageComponent,

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
    StringToArrayPipe,
    VinylCardComponent,
    ArrayToStringPipe,
    VinylInfoComponent,
    GenreCardComponent,
    FormatInfoComponent,
    FormatCardComponent,
    RedordCompanyInfoComponent,
    RecordCompanyCardComponent,
    CollectionCardComponent,
    CollectionInfoComponent,
  ]
})
export class MusicModule { }

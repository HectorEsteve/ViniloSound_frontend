import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Vinyl } from '../../interfaces/vinyl.interface';
import { BandService } from '../../services/band.service';
import { Genre } from '../../interfaces/genre.interface';
import { Song } from '../../interfaces/song.interface';
import { Band } from '../../interfaces/band.interface';
import { environments } from '../../../../environments/environments';
import { SongCardsComponent } from '../song-card/song-cards.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { BandCardComponent } from '../band-card/band-card.component';
import { Format } from '../../interfaces/format.interface';
import { FormatCardComponent } from '../format-card/format-card.component';
import { RecordCompany } from '../../interfaces/record-companies.interface';
import { RecordCompanyCardComponent } from '../record-company-card/record-company-card.component';

@Component({
  selector:     'vinyl-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SongCardsComponent,
    GenreCardComponent,
    BandCardComponent,
    FormatCardComponent,
    RecordCompanyCardComponent
  ],
  templateUrl:  './vinyl-info.component.html',
  styleUrl:     './vinyl-info.component.css',
})
export class VinylInfoComponent implements OnInit{
  ngOnInit(): void {
    this.tempRout = environments.tempRoutVinyl;

    for(let band of this.vinyl.bands){
      this.bandService.searchBandsByName(band.name).
        subscribe(
          (bands: Band[]) => {
            this.bands.push(...bands);
          });
    }

    for (const song of this.vinyl.songs) {
      this.songs.push(song);
      const existingGenre = this.genres.find(genre => genre.id === song.genre.id);
      if (!existingGenre) {
        this.genres.push(song.genre);
      };
    }

    this.formats.push(this.vinyl.format);
    this.recordCompanies.push(this.vinyl.record_company);

  }

  public tempRout:string='';

  private bandService = inject( BandService );

  @Input()
  public vinyl!: Vinyl;

  public genres: Genre[] = [];
  public songs: Song[] = [];
  public bands: Band[] = [];
  public formats: Format[] = [];
  public recordCompanies: RecordCompany[] = [];

}

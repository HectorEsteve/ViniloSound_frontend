import {  Component, OnDestroy, inject } from '@angular/core';
import { VinylService } from '../../services/vinyl.service';
import { SongService } from '../../services/song.service';
import { BandService } from '../../services/band.service';
import { CollectionService } from '../../services/collection.service';


@Component({
  selector:     'app-layout-page',
  templateUrl:  './layout-page.component.html',
})
export class MusicLayoutPageComponent implements OnDestroy{

  private vinylService = inject( VinylService );
  private songService = inject( SongService );
  private bandService = inject( BandService );
  private collectionService = inject( CollectionService );

  ngOnDestroy(): void {
    this.vinylService.resetFromLocalStorageByBand();
    this.vinylService.resetFromLocalStorageByGenre();
    this.vinylService.resetFromLocalStorageByName();

    this.songService.resetFromLocalStorageByBand();
    this.songService.resetFromLocalStorageByGenre();
    this.songService.resetFromLocalStorageByName();

    this.bandService.resetFromLocalStorageByName();
    this.bandService.resetFromLocalStorageByName();

    this.collectionService.resetFromLocalStorageByBand();
    this.collectionService.resetFromLocalStorageByName();
    this.collectionService.resetFromLocalStorageByUser();
    this.collectionService.resetFromLocalStorageByVinyl();
  }
}

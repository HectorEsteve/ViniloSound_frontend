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

  ngOnDestroy(): void {
    localStorage.removeItem('cacheStoreSongs');
    localStorage.removeItem('cacheStoreBands');
    localStorage.removeItem('cacheStoreVinyl');
    localStorage.removeItem('cacheStoreCollections');
  }
}

import {  Component, OnDestroy } from '@angular/core';

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

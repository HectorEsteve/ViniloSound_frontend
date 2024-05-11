import {  Component, OnDestroy, inject } from '@angular/core';
import { SongService } from '../../services/song.service';

@Component({
  selector:     'app-layout-page',
  templateUrl:  './layout-page.component.html',
})
export class MusicLayoutPageComponent implements OnDestroy{

  ngOnDestroy(): void {
    localStorage.clear();
  }
}

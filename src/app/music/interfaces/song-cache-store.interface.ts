import { Song } from "./song.interface";

export interface SongCacheStore{
  byName:Termsongs;
  byBand:Termsongs;
}

export interface Termsongs{
  term:string;
  songs:Song[]
}


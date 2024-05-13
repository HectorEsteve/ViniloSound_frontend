import { Song } from "./song.interface";

export interface SongCacheStore{
  byName:Termsongs;
  byBand:Termsongs;
  byGenre:Termsongs;
}

export interface Termsongs{
  term:string;
  songs:Song[]
}

